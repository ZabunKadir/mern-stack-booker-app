const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      default: "None",
    },
    gender: {
      type: String,
      default: "None",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: String,
      default:
        "https://odtukaltev.com.tr/wp-content/uploads/2018/04/person-placeholder.jpg",
    },
    favoriteBooks: [Object],
    readBooks: [Object],
    toReadBooks: [Object],
    ratings: [Object],
    about: {
      instagram: { type: String, default: "None" },
      twitter: { type: String, default: "None" },
      facebook: { type: String, default: "None" },
      linkedin: { type: String, default: "None" },
    },
    recommendationList: [Object],
    lastClicked: [String],
    recentSearches: [String],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
