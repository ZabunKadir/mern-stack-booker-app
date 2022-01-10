const express = require("express");
const {
  getAllBooks,
  getBookById,
  getBookByCategory,
  getBookBySearch,
} = require("../controllers/bookController");

const router = express.Router();

router.route("/allBooks").get(getAllBooks);
router.route("/:id").get(getBookById);
router.route("/category").post(getBookByCategory);
router.route("/search").post(getBookBySearch);
module.exports = router;
