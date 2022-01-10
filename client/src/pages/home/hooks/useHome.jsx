import { useDispatch, useSelector } from "react-redux";

import { deleteSelectedCategory } from "../../../store/category";

import { useState, useEffect } from "react";
const BookHooks = () => {
  const dispatch = useDispatch();
  const { loading, selectedCategory, mainCategory } = useSelector(
    (state) => state.category
  );
  const deleteCategory = async (category) => {
    await dispatch(deleteSelectedCategory(category));
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
    selectedCategory,
    mainCategory,
    deleteCategory,
    useWindowDimensions,
  };
};

export default BookHooks;
