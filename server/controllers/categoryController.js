const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}, [
    "categoryContents",
    "categoryName",
  ]);
  if (categories) {
    res.status(201).json({ categories });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});
module.exports = { getAllCategories };
