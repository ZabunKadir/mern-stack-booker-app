const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
    unique: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  categoryContents: [String],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
