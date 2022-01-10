const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("../models/bookModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;
  if (name == "" || surname == "" || email == "" || password == "") {
    res.status(400);
    throw new Error("Please Fill All Fields");
  } else {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = new User({
        name,
        surname,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ email: result.email, id: result._id }, "test", {
        expiresIn: "1h",
      });
      result.save();
      res.status(200).json({ result, token });
    } catch (error) {
      res.status(500);
      throw new Error("User couldn't be created.");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status.json({ message: "User doesn't exist." });
    if (
      !(existingUser && (await bcrypt.compare(password, existingUser.password)))
    ) {
      res.status(201);
      throw new Error("Invalid Password!.");
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});
const getProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id, [
    "id",
    "favoriteBooks",
    "toReadBooks",
    "readBooks",
    "name",
    "surname",
    "about",
    "email",
    "image",
    "birthday",
    "gender",
  ]);

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});
const addList = (user, book, buttonType) => {
  if (buttonType === "favorite") {
    user.favoriteBooks.push(book);
  } else if (buttonType === "readBook") {
    user.readBooks.push(book);
  } else if (buttonType === "toRead") {
    user.toReadBooks.push(book);
  } else {
    throw new Error("Not Added!");
  }
};
const deleteList = async (user, book, buttonType) => {
  if (buttonType === "favorite") {
    const index = user.favoriteBooks.findIndex((item) => item.id === book.id);
    if (index == 0) {
      user.favoriteBooks.pop();
    } else {
      user.favoriteBooks.splice(index, index);
    }
  } else if (buttonType === "readBook") {
    const index = user.readBooks.findIndex((item) => item.id === book.id);
    if (index == 0) {
      user.readBooks.pop();
    } else {
      user.readBooks.splice(index, index);
    }
  } else if (buttonType === "toRead") {
    const index = user.toReadBooks.findIndex((item) => item.id === book.id);
    if (index == 0) {
      user.toReadBooks.pop();
    } else {
      user.toReadBooks.splice(index, index);
    }
    //user.toReadBooks.pull(book);
  } else {
    throw new Error("Not Deleted!");
  }
};
const listActions = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const book = req.body.book;
  const type = req.body.buttonType;
  const token = req.body.token;
  const user = await User.findById(userId);
  if (user && token) {
    if (type === "favorite") {
      if (user.favoriteBooks.some((item) => item.id === book.id)) {
        await deleteList(user, book, type);
      } else {
        await addList(user, book, type);
      }
    } else if (type === "readBook") {
      if (user.readBooks.some((item) => item.id === book.id)) {
        await deleteList(user, book, type);
      } else {
        await addList(user, book, type);
      }
    } else if (type === "toRead") {
      if (user.toReadBooks.some((item) => item.id === book.id)) {
        await deleteList(user, book, type);
      } else {
        await addList(user, book, type);
      }
    }
    const updatedUser = await user.save();
    res.status(200).json({ result: updatedUser, token });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});
const deleteBook = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const book = req.body.book;
  const type = req.body.type;
  const token = req.body.token;
  const user = await User.findById(userId);
  if (user && token) {
    await deleteList(user, book, type);
    const updatedUser = await user.save();
    res.status(200).json({ result: updatedUser, token });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});
const searchInProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const type = req.body.type;
  const user = await User.findById(userId);
  const values = req.body.searchValue.split(" ");
  const books = [];
  if (user) {
    if (type === "favorite") {
      values.map((val, index) => {
        if (val != "") {
          user.favoriteBooks.filter((book) => {
            if (book.title.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
              if (!books.some((a) => a == book)) {
                books.push(book);
              }
            }
            book.authors.filter((author) => {
              if (author.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                if (!books.some((a) => a == book)) {
                  books.push(book);
                }
              }
            });
            book.categories.filter((category) => {
              if (category.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                if (!books.some((a) => a == book)) {
                  books.push(book);
                }
              }
            });
          });
        }
      });
    } else if (type === "readBook") {
      values.map((val, index) => {
        if (val != "") {
          user.readBooks.filter((book) => {
            if (book.title.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
              if (!books.some((a) => a == book)) {
                books.push(book);
              }
            }
            book.authors.filter((author) => {
              if (author.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                if (!books.some((a) => a == book)) {
                  books.push(book);
                }
              }
            });
            book.categories.filter((category) => {
              if (category.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                if (!books.some((a) => a == book)) {
                  books.push(book);
                }
              }
            });
          });
        }
      });
    } else if (type === "toRead") {
      values.map((val, index) => {
        if (val != "") {
          user.toReadBooks.filter((book) => {
            if (book.title.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
              if (!books.some((a) => a == book)) {
                books.push(book);
              }
            }
            book.authors.filter((author) => {
              if (author.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                if (!books.some((a) => a == book)) {
                  books.push(book);
                }
              }
            });
            book.categories.filter((category) => {
              if (category.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                if (!books.some((a) => a == book)) {
                  books.push(book);
                }
              }
            });
          });
        }
      });
    }
    res.status(200).json(books);
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.form._id);
  if (user) {
    user.name = req.body.form.name || user.name;
    user.surname = req.body.form.surname || user.surname;
    user.gender = req.body.form.gender || user.gender;
    if (req.body.form.email !== user.email) {
      const otherUser = await User.findOne({ email: req.body.form.email });
      if (otherUser) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        user.email = req.body.form.email;
      }
    }
    if (req.body.form.password) {
      const hashedPassword = await bcrypt.hash(req.body.form.password, 12);
      user.password = hashedPassword;
    }
    user.birthday = req.body.form.birthday || user.birthday;
    if (req.body.photo) {
      user.image = req.file.filename || user.image;
    }

    user.about.instagram = req.body.form.instagram || user.about.instagram;
    user.about.facebook = req.body.form.facebook || user.about.facebook;
    user.about.twitter = req.body.form.twitter || user.about.twitter;
    user.about.linkedin = req.body.form.linkedin || user.about.linkedin;

    const updatedUser = await user.save();
    const token = jwt.sign(
      { email: updatedUser.email, id: updatedUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: updatedUser, token });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});
const getProfilesBySearch = asyncHandler(async (req, res) => {
  const searchValue = req.body.searchValue.split(" ");
  const allUsers = await User.find({}, [
    "name",
    "surname",
    "readBooks",
    "image",
  ]);
  const users = [];
  try {
    searchValue.map((val) => {
      if (val != "") {
        allUsers.filter((user) => {
          if (user.name.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
            if (!users.some((a) => a == user)) {
              users.push(user);
            }
          }
          if (user.surname.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
            if (!users.some((a) => a == user)) {
              users.push(user);
            }
          }
        });
      }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
    throw new Error("Error");
  }
});
const ratingActions = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  const receivedRate = req.body.rate;
  const bookId = req.body.book.id;
  const book = await Book.findOne({ id: bookId });
  if (user) {
    const index = user.ratings.findIndex((a) => a.bookId === bookId);
    if (index == 0) {
      user.ratings.pop();
    } else if (index != -1) {
      user.ratings.splice(index, index);
    }

    user.ratings.push({ bookId: bookId, rate: receivedRate });
    const indexTwo = book.raters.findIndex(
      (a) => a.userId === user._id.toString()
    );
    if (indexTwo == 0) {
      book.raters.pop();
    } else if (indexTwo != -1) {
      book.raters.splice(indexTwo, indexTwo);
    }
    book.raters.push({
      userId: user._id.toString(),
      rateValue: receivedRate,
    });
    book.totalRate = 0;
    for (let index = 0; index < book.raters.length; index++) {
      book.totalRate += book.raters[index].rateValue;
    }
    const updatedBook = await book.save();
    const updatedUser = await user.save();

    const token = jwt.sign(
      { email: updatedUser.email, id: updatedUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: updatedUser, token });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});
const categoryCalculator = async (stringList, objectList, object) => {
  const tempCategoryList = [];
  if (stringList) {
    for (let index = 0; index < stringList.length; index++) {
      const book = await Book.findOne(stringList[index], ["categories"]);
      for (let index = 0; index < book.categories.length; index++) {
        tempCategoryList.push(book.categories[index]);
      }
    }
  } else if (objectList) {
    for (let i = 0; i < objectList.length; i++) {
      for (let y = 0; y < objectList[i].categories.length; y++) {
        tempCategoryList.push(objectList[i].categories[y]);
      }
    }
  } else if (object) {
    for (let y = 0; y < object.categories.length; y++) {
      tempCategoryList.push(object.categories[y]);
    }
  } else {
    return;
  }
  return tempCategoryList;
};
const getBookByBookId = async (list, allBooks) => {
  const book = [];
  if (typeof list == "object") {
    list.forEach((element) => {
      if (element.bookId) {
        for (let index = 0; index < allBooks?.length; index++) {
          if (allBooks[index].id == element.bookId) {
            book.push(allBooks[index]);
          }
        }
      } else {
        for (let index = 0; index < allBooks?.length; index++) {
          if (allBooks[index].id == element) {
            book.push(allBooks[index]);
          }
        }
      }
    });
  } else {
    return;
  }
  return book;
};
const authorCalculator = async (stringList, objectList, object) => {
  const authorList = [];
  if (objectList) {
    for (let index = 0; index < objectList.length; index++) {
      for (let y = 0; y < objectList[index].authors.length; y++) {
        authorList.push(objectList[index].authors[y]);
      }
    }
  } else if (stringList) {
    for (let index = 0; index < stringList.length; index++) {
      const book = await Book.findOne(stringList[index], ["authors"]);
      for (let index = 0; index < book.authors.length; index++) {
        authorList.push(book.authors[index]);
      }
    }
  } else if (object) {
    for (let y = 0; y < object.authors.length; y++) {
      authorList.push(object.authors[y]);
    }
  } else return;
  return authorList;
};
function sortByRepetition(arr) {
  const itemCount = [];
  const countsSortable = [];
  arr.forEach(function (x) {
    itemCount[x] = (itemCount[x] || 0) + 1;
  });
  for (var i in itemCount) {
    countsSortable.push([itemCount[i], i]);
  }

  countsSortable.sort(function (a, b) {
    return b[0] - a[0];
  });

  return countsSortable;
}
const recommendationListByUser = async (user, allBooks) => {
  if (user) {
    const list = [];
    const totalRecommendationLength = 12;
    let categoryList = [];
    let authorList = [];
    let lengthList = [];
    let ratingCategory = await categoryCalculator(
      null,
      await getBookByBookId(user.ratings, allBooks)
    );
    let favoriCategory = await categoryCalculator(null, user.favoriteBooks);
    let toReadCategory = await categoryCalculator(null, user.toReadBooks);
    let clickedCategory = await categoryCalculator(
      null,
      await getBookByBookId(user.lastClicked, allBooks)
    );
    let favoriAuthor = await authorCalculator(null, user.favoriteBooks);
    let toReadAuthor = await authorCalculator(null, user.toReadBooks);
    let ratingAuthor = await authorCalculator(
      null,
      await getBookByBookId(user.ratings, allBooks)
    );
    let clickedAuthor = await authorCalculator(
      null,
      await getBookByBookId(user.lastClicked, allBooks)
    );

    let books = [];
    let searchedByUser = user.recentSearches;

    await searchedByUser?.map((val) => {
      if (val != "") {
        allBooks.filter((book) => {
          if (book.title.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
            if (!books.some((a) => a == book)) {
              books.push(book);
            }
          }
          book.authors.filter((author) => {
            if (author.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
              if (!books.some((a) => a == book)) {
                books.push(book);
              }
            }
          });
          book.categories.filter((category) => {
            if (category.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
              if (!books.some((a) => a == book)) {
                books.push(book);
              }
            }
          });
        });
      }
    });
    let searchedCategory = await categoryCalculator(null, books);
    let searchedAuthor = await authorCalculator(null, books);
    lengthList.push(
      favoriCategory,
      toReadCategory,
      ratingCategory,
      clickedCategory,
      clickedAuthor,
      ratingAuthor,
      favoriAuthor,
      toReadAuthor,
      searchedAuthor,
      searchedCategory
    );
    const pushControlledValue = (array, index, list) => {
      if (
        array[index] != "" &&
        array[index] != [] &&
        array[index] != undefined
      ) {
        list.push(array[index]);
      } else return;
    };
    let maxArrayLength = lengthList.sort((a, b) => b.length - a.length);

    for (let index = 0; index <= maxArrayLength[0].length; index++) {
      pushControlledValue(favoriCategory, index, categoryList);
      pushControlledValue(toReadCategory, index, categoryList);
      pushControlledValue(ratingCategory, index, categoryList);
      pushControlledValue(clickedCategory, index, categoryList);
      pushControlledValue(searchedCategory, index, categoryList);

      pushControlledValue(favoriAuthor, index, authorList);
      pushControlledValue(toReadAuthor, index, authorList);
      pushControlledValue(ratingAuthor, index, authorList);
      pushControlledValue(clickedAuthor, index, authorList);
      pushControlledValue(searchedAuthor, index, authorList);
    }

    const topAuthor = sortByRepetition(authorList).filter(
      (item, index) => index < 5
    );
    const topCategory = sortByRepetition(categoryList).filter(
      (item, index) => index < 5
    );
    const higherRate = [];
    const lowerRate = [];
    allBooks.sort(function (a, b) {
      return b.totalRate - a.totalRate;
    });
    allBooks.filter((item) =>
      item.totalRate >= allBooks[0].totalRate / 2 &&
      item.totalRate / item.raters.length >= 3.5
        ? higherRate.push(item)
        : lowerRate.push(item)
    );
    let booksByValue = (value, valueType, user, listMaxLength) => {
      let rangeByValue = [];
      let totalRange = 0;
      for (let index = 0; index < value.length; index++) {
        if (totalRange < listMaxLength) {
          rangeByValue.push([
            Math.round((listMaxLength * value[index][0]) / 100),
            value[index][1],
          ]);
          totalRange += rangeByValue[index][0];
        }
      }
      for (let index = 0; index < rangeByValue.length; index++) {
        for (let i = 0; i < rangeByValue[index][0]; i++) {
          higherRate.find(function (currentValue) {
            if (
              bookControlledInsertion(
                currentValue,
                user,
                list,
                rangeByValue[index][1],
                valueType
              )
            ) {
              const counter = list.filter((book) =>
                book[valueType].some(
                  (category) => category == rangeByValue[index][1]
                )
              );

              if (counter.length < rangeByValue[index][0]) {
                list.push(currentValue);
              }
            } else {
              lowerRate.find(function (currentValue) {
                if (
                  bookControlledInsertion(
                    currentValue,
                    user,
                    list,
                    rangeByValue[index][1],
                    valueType
                  )
                ) {
                  const counterCategory = list.filter((book) =>
                    book[valueType].some(
                      (category) => category == rangeByValue[index][1]
                    )
                  );

                  if (counterCategory.length < rangeByValue[index][0]) {
                    list.push(currentValue);
                  }
                }
              });
            }
          });
        }
      }
    };
    const bookControlledInsertion = (
      book,
      user,
      list,
      rangeValue,
      valueType
    ) => {
      let out = false;

      if (
        !user.favoriteBooks.some((favorite) => favorite.id == book.id) &&
        !user.toReadBooks.some((toRead) => toRead.id == book.id) &&
        !user.readBooks.some((read) => read.id == book.id)
      ) {
        if (!list.some((listBook) => listBook == book)) {
          if (valueType) {
            book[valueType].filter(function (type) {
              if (type == rangeValue) {
                out = true;
              } else {
                out = false;
              }
            });
          } else {
            out = true;
          }
        }
      }
      return out;
    };
    if (topAuthor.length != 0 && topCategory.length != 0) {
      let authorTotal = 0;
      let categoryTotal = 0;
      for (let index = 0; index < topAuthor.length; index++) {
        if (topAuthor[index]) {
          authorTotal += topAuthor[index][0];
        }
        if (topCategory[index]) {
          categoryTotal += topCategory[index][0];
        }
      }
      const authorPercent = [];
      const categoryPercent = [];
      for (let index = 0; index < topAuthor.length; index++) {
        if (topAuthor[index]) {
          authorPercent.push([
            (topAuthor[index][0] / authorTotal) * 100,
            topAuthor[index][1],
          ]);
        }

        if (topCategory[index]) {
          categoryPercent.push([
            (topCategory[index][0] / categoryTotal) * 100,
            topCategory[index][1],
          ]);
        }
      }
      booksByValue(categoryPercent, "categories", user, 8);
      booksByValue(authorPercent, "authors", user, 4);
      while (list.length < totalRecommendationLength) {
        let fillOne = higherRate[Math.floor(Math.random() * higherRate.length)];
        let fillTwo = lowerRate[Math.floor(Math.random() * lowerRate.length)];
        if (bookControlledInsertion(fillOne, user, list, null, null)) {
          list.push(fillOne);
        } else if (bookControlledInsertion(fillTwo, user, list, null, null)) {
          list.push(fillTwo);
        } else {
          console.log("While Error");
        }
      }
    } else {
      while (list.length < totalRecommendationLength) {
        let fillOne = higherRate[Math.floor(Math.random() * higherRate.length)];
        let fillTwo = lowerRate[Math.floor(Math.random() * lowerRate.length)];
        if (bookControlledInsertion(fillOne, user, list, null, null)) {
          list.push(fillOne);
        } else if (bookControlledInsertion(fillTwo, user, list, null, null)) {
          list.push(fillTwo);
        } else {
          console.log("While Error");
        }
      }
    }
    return list;
  } else {
    res.status(400);
    throw new Error("User Not Found!");
  }
};
const getUserRecommendationList = asyncHandler(async (req, res) => {
  const allBooks = await Book.find({}, [
    "categories",
    "title",
    "authors",
    "totalRate",
    "raters",
    "thumbnailUrl",
    "id",
  ]);
  if (req.body.user) {
    const user = await User.findById(req.body.user._id, [
      "favoriteBooks",
      "toReadBooks",
      "readBooks",
      "ratings",
      "lastClicked",
      "recentSearches",
      "recommendationList",
    ]);
    if (user) {
      const listForUser = await recommendationListByUser(user, allBooks);
      res.status(200).json({ list: listForUser });
    } else {
      res.status(400);
      throw new Error("User Not Found!");
    }
  } else {
    const highlights = [];
    const higherRate = [];
    const lowerRate = [];
    allBooks.sort(function (a, b) {
      return b.totalRate - a.totalRate;
    });
    allBooks.filter((item) =>
      item.totalRate >= allBooks[0].totalRate / 2 &&
      item.totalRate / item.raters.length >= 3.5
        ? higherRate.push(item)
        : lowerRate.push(item)
    );
    for (let index = 0; index < 12; index++) {
      const highBook =
        higherRate[Math.floor(Math.random() * higherRate.length)];

      if (highlights.some((book) => book == highBook)) {
        const lowBook = lowerRate[Math.floor(Math.random() * lowerRate.length)];
        if (!highlights.some((low) => low == lowBook)) {
          highlights.push(lowBook);
        }
      } else {
        highlights.push(highBook);
      }
    }
    highlights.sort(function (a, b) {
      return b.totalRate - a.totalRate;
    });
    res.status(200).json({ list: highlights });
  }
});
const trackerUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    try {
      if (req.body.searchValue) {
        if (!user.recentSearches.some((item) => item == req.body.searchValue)) {
          if (user.recentSearches.length <= 20) {
            user.recentSearches.push(req.body.searchValue);
          } else {
            user.recentSearches.shift();
            user.recentSearches.push(req.body.searchValue);
          }
        }
      } else {
        if (!user.lastClicked.some((item) => item == req.body.book.id)) {
          if (user.lastClicked.length <= 20) {
            user.lastClicked.push(req.body.book.id);
          } else {
            user.lastClicked.shift();
            user.lastClicked.push(req.body.book.id);
          }
        }
      }

      await user.save();
      res.status(200).json("Process Is Successfuly!");
    } catch (error) {}
  } else {
    res.status(400);
    throw new Error("User Not Found!");
  }
});
module.exports = {
  registerUser,
  authUser,
  updateUserProfile,
  getProfile,
  listActions,
  deleteBook,
  getProfilesBySearch,
  ratingActions,
  searchInProfile,
  trackerUser,
  getUserRecommendationList,
};
