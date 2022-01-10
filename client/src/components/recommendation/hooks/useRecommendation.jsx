import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getRecommendationList } from "../../../store/tracker";
import API from "../../../utils/api";

const RecommendationHooks = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { recommendationList } = useSelector((state) => state.tracker);
  const { selectedCategory } = useSelector((state) => state.category);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );
  const history = useHistory();

  const getRecommendationBook = async (user) => {
    await dispatch(getRecommendationList(user));
  };
  const getBookCategory = async (category) => {};

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
    } else {
      history.push("/signIn");
    }
  };
  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname.split("/")[1] == "books"
    ) {
      getRecommendationBook(user);
    } else {
      return;
    }
  }, [location, user]);
  return {
    recommendationList,
    user,
  };
};

export default RecommendationHooks;
