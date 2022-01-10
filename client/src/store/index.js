import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import profile from "./profile";
import book from "./book";
import category from "./category";
import tracker from "./tracker";
export default configureStore({
  reducer: { auth, profile, book, category, tracker },
});
