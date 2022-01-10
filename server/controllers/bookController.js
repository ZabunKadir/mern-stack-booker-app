const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}, [
    "title",
    "authors",
    "id",
    "totalRate",
    "shortDescription",
    "thumbnailUrl",
    "raters",
  ]);
  if (books) {
    res.status(201).json(books);
  } else {
    res.status(400);
    throw new Error("Books Not Found!");
  }
});
const getBookById = asyncHandler(async (req, res) => {
  const bookById = await Book.findOne(req.params, [
    "id",
    "title",
    "pageCount",
    "publishedDate",
    "authors",
    "categories",
    "longDescription",
    "raters",
    "totalRate",
    "thumbnailUrl",
  ]);
  if (bookById) {
    res.status(201).json(bookById);
  } else {
    res.status(400);
    throw new Error("Book Not Found!");
  }
});
const getBookByCategory = asyncHandler(async (req, res) => {
  const category = req.body.category;
  const main = req.body.main;
  const allBooks = await Book.find({}, [
    "title",
    "authors",
    "id",
    "totalRate",
    "shortDescription",
    "thumbnailUrl",
    "raters",
    "categories",
  ]);
  if (main.categoryName === "Highlights") {
    const higherRate = [];
    allBooks.sort(function (a, b) {
      return b.totalRate - a.totalRate;
    });
    allBooks.filter((item) =>
      item.totalRate >= allBooks[0].totalRate / 2 &&
      item.totalRate / item.raters.length >= 3.5
        ? higherRate.push(item)
        : null
    );
    if (!higherRate || higherRate.length == 0)
      return res.status(204).json({ message: "No Result." });
    res.status(200).json(higherRate);
  } else {
    const books = allBooks.reduce((acc, item) => {
      let filteredItem = item.categories.some((cat) => category.includes(cat));
      if (filteredItem) {
        acc = [...acc, item];
      }
      return acc;
    }, []);
    try {
      if (!books || books.length == 0)
        return res.status(204).json({ message: "No Result." });
      res.status(200).json(books);
    } catch (error) {
      res.status(400);
      throw new Error("Error");
    }
  }
});
const getBookBySearch = asyncHandler(async (req, res) => {
  const searchValue = req.body.searchValue.split(" ");
  const allBooks = await Book.find({}, [
    "title",
    "authors",
    "id",
    "totalRate",
    "shortDescription",
    "thumbnailUrl",
    "raters",
    "categories",
  ]);
  const books = [];
  try {
    searchValue.map((val) => {
      if (val != "") {
        allBooks.filter((book) => {
          if (book.title.toLowerCase().includes(val.toLowerCase())) {
            if (!books.includes(book)) {
              books.push(book);
            }
          }
          book.authors.filter((author) => {
            if (author.toLowerCase().includes(val.toLowerCase())) {
              if (!books.includes(book)) {
                books.push(book);
              }
            }
          });
          book.categories.filter((category) => {
            if (category.toLowerCase().includes(val.toLowerCase())) {
              if (!books.includes(book)) {
                books.push(book);
              }
            }
          });
        });
      }
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(400);
    throw new Error("Error");
  }
});
module.exports = {
  getAllBooks,
  getBookById,
  getBookByCategory,
  getBookBySearch,
};
