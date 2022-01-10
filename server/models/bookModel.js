const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    pageCount: {
      type: String,
      default: "None",
    },
    publishedDate: {
      date: { type: Date },
    },
    thumbnailUrl: {
      type: String,
      default:
        "https://www.yaseminsungur.com/wp-content/uploads/2012/06/kitap-okuma-aliskanligi_212766.gif",
    },
    shortDescription: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    status: {
      type: String,
    },
    authors: [String],
    categories: [String],
    raters: [Object],
    totalRate: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
