const express = require("express");

const {
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
} = require("../controllers/userController");
const { protect } = require("../middlewares/auth");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, fileFilter });

router.route("/signUp").post(registerUser);
router.route("/signIn").post(authUser);

router.route("/profile/:id").post(getProfile);
router.route("/profile/:id/listActions").post(listActions);
router.route("/profile/:id/ratingActions").post(protect, ratingActions);
router.route("/profile/:id/deleteBook").post(protect, deleteBook);
router.route("/profile/:id/searchBook").post(searchInProfile);

router
  .route("/updateProfile")
  .post(upload.single("image"), protect, updateUserProfile);

router.route("/search").post(getProfilesBySearch);

router.route("/recommendationList").post(getUserRecommendationList);
router.route("/tracker/:id").post(trackerUser);

module.exports = router;
