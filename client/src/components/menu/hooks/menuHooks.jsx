import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, selectMainCategory } from "../../../store/category";
import { getBookMainCategory } from "../../../store/book";
const MenuHooks = () => {
  const dispatch = useDispatch();
  const { loading, categories, mainCategory, selectedCategory } = useSelector(
    (state) => state.category
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );
  const allCategories = async () => {
    await dispatch(getAllCategories());
  };
  const getHighlights = async (main) => {
    await dispatch(getBookMainCategory(null, main));
  };
  const getMainCategory = (select) => {
    dispatch(selectMainCategory(select));
  };
  useEffect(() => {
    allCategories();
  }, []);
  useEffect(() => {
    if (selectedCategory.length == 0) {
      getMainCategory();
    }
  }, [selectedCategory]);
  return {
    loading,
    categories,
    user,
    getMainCategory,
    mainCategory,
    getHighlights,
  };
};

export default MenuHooks;
