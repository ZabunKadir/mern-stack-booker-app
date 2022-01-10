const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

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

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(12);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
