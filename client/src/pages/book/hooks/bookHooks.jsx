import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import {
  getAllBook,
  getBookId,
  getBookMainCategory,
  getBookSearch,
} from "../../../store/book";
import API from "../../../utils/api";
import { recentSearches } from "../../../store/tracker";
const BookHooks = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { selectedCategory, mainCategory } = useSelector(
    (state) => state.category
  );
  const { loading, books, book } = useSelector((state) => state.book);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );
  const history = useHistory();
  const [favoriteButton, setFavoriteButton] = useState(false);
  const [readButton, setReadButton] = useState(false);
  const [toReadButton, setToReadButton] = useState(false);
  const [value, setValue] = useState("");
  const allBook = async () => {
    await dispatch(getAllBook());
  };
  const getBookCategory = async (category) => {
    await dispatch(getBookMainCategory(category, mainCategory));
  };
  const getBookById = async (path) => {
    await dispatch(getBookId(path));
  };

  const addSearchValueToUser = async (user, value) => {
    if (user) {
      await dispatch(recentSearches(user, value));
    } else {
      return;
    }
  };
  const userRatingHandler = async (user, book, rate) => {
    if (user) {
      const token = JSON.parse(localStorage.getItem("profile"))?.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: { token },
        },
      };
      const res = await API.post(
        "/users/profile/" + user._id + "/ratingActions",
        {
          book,
          rate,
          token,
        },
        config
      );

      await localStorage.setItem("profile", JSON.stringify(res.data));
      await setUser(JSON.parse(localStorage.getItem("profile"))?.result);
      await getBookById(location.pathname.split("/")[2]);
    } else {
      history.push("/signIn");
    }
  };
  const searchAction = async (searchValue) => {
    setValue(searchValue);
    if (searchValue !== "") {
      await dispatch(getBookSearch(searchValue));
      addSearchValueToUser(user, searchValue);
    }
  };
  const buttonControl = async (user, book) => {
    if (book) {
      if (user) {
        if (user.favoriteBooks.some((item) => item.id === book.id)) {
          await setFavoriteButton(true);
        } else {
          await setFavoriteButton(false);
        }
        if (user.readBooks.some((item) => item.id === book.id)) {
          await setReadButton(true);
        } else {
          await setReadButton(false);
        }
        if (user.toReadBooks.some((item) => item.id === book.id)) {
          await setToReadButton(true);
        } else {
          await setToReadButton(false);
        }
      }
    }
  };
  const clickHandler = async (e, user, book, buttonType) => {
    if (user) {
      e.preventDefault();
      const token = JSON.parse(localStorage.getItem("profile"))?.token;
      const res = await API.post(
        "/users/profile/" + user._id + "/listActions",
        {
          book,
          buttonType,
          token,
        }
      );
      localStorage.setItem("profile", JSON.stringify(res.data));
      if (buttonType === "favoriteBooks") {
        setFavoriteButton(!favoriteButton);
      } else if (buttonType === "readBooks") {
        setReadButton(!readButton);
      } else if (buttonType === "toReadBooks") {
        setToReadButton(!toReadButton);
      }
    } else {
      history.push("/signIn");
    }
  };
  useEffect(() => {
    if (selectedCategory.length > 0) {
      getBookCategory(selectedCategory);
    } else if (value === "" && location.pathname.split("/")[1] != "books") {
      allBook();
    } else {
      return;
    }
  }, [selectedCategory, value, location]);
  useEffect(() => {
    if (user) buttonControl(user, book);
  }, [user, book]);
  const convertDate = (bookDate) => {
    let date = new Date(bookDate);
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    return day + "." + month + "." + year;
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }
  return {
    loading,
    books,
    convertDate,
    getBookById,
    book,
    buttonControl,
    favoriteButton,
    readButton,
    toReadButton,
    clickHandler,
    userRatingHandler,
    searchAction,
    user,
    useWindowDimensions,
  };
};

export default BookHooks;
