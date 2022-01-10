import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategory } from "../../store/category";
const CategoryCard = ({ category }) => {
  const dispatch = useDispatch();
  const contents = category?.categoryContents;
  const [selectedCategory, setSelectedCategory] = useState("");

  const getCategoryName = (categoryName) => {
    setSelectedCategory(categoryName);
  };
  const setCategoryRedux = async (selected) => {
    await dispatch(getCategory(selected));
  };
  useEffect(() => {
    if (
      selectedCategory != null &&
      selectedCategory !== undefined &&
      selectedCategory != ""
    ) {
      setCategoryRedux(selectedCategory);
    } else return;
  }, [selectedCategory]);

  return contents?.map((content, index) => (
    <button key={index} onClick={() => getCategoryName(content)}>
      {content}
      <FontAwesomeIcon icon={faPlus} className="CategoryCard-icon" />
    </button>
  ));
};
export default CategoryCard;
