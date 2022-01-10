import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import {
  getProfile,
  updateProfile,
  getProfileSearch,
} from "../../../store/profile";
import API from "../../../utils/api";
import { useState, useEffect } from "react";

const ProfileHooks = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, error, profile, profiles } = useSelector(
    (state) => state.profile
  );
  const [currentUser, setCurrentUser] = useState({});
  const [books, setBooks] = useState([]);
  const [value, setValue] = useState("");
  const [name, setName] = useState(null);
  const updateProfileByData = async (formData) => {
    await dispatch(updateProfile(formData));
    await getProfileById("/profile/" + profile?._id);
  };
  const getProfileById = async (location) => {
    await dispatch(getProfile(location));
  };
  const searchAction = async (searchValue) => {
    setValue(searchValue);
    if (searchValue !== "") {
      await dispatch(getProfileSearch(searchValue));
    }
  };
  const buttonBookHandler = async (name) => {
    if (name === "readBook") {
      await setBooks(profile?.readBooks);
    } else if (name === "favorite") {
      await setBooks(profile?.favoriteBooks);
    } else if (name === "toRead") {
      await setBooks(profile?.toReadBooks);
    }
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
  const searchInList = async (user, type, searchValue) => {
    if (type == null) {
      type = "readBook";
    }
    if (user && searchValue !== "") {
      const res = await API.post("/users/profile/" + user._id + "/searchBook", {
        type,
        searchValue,
      });
      await setBooks(res.data);
    } else {
      buttonBookHandler(type);
    }
  };
  useEffect(() => {
    if (profile) {
      if (name != null) {
        buttonBookHandler(name);
      } else {
        buttonBookHandler("readBook");
      }
    } else {
      return;
    }
  }, [profile, name]);
  useEffect(() => {
    if (location && location.pathname.split("/")[1] === "profile") {
      getProfileById(location.pathname);
      setCurrentUser(JSON.parse(localStorage.getItem("profile"))?.result);
    } else {
      return;
    }
  }, [location, value]);
  return {
    profile,
    profiles,
    loading,
    error,
    name,
    searchAction,
    currentUser,
    books,
    setName,
    searchInList,
    updateProfileByData,
    useWindowDimensions,
  };
};

export default ProfileHooks;
