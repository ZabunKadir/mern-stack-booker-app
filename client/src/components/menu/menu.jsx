import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleDown,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import MenuHooks from "./hooks/menuHooks";
import CategoryCard from "../card/categoryCard";
import { Link } from "react-router-dom";
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const {
    loading,
    categories,
    user,
    getMainCategory,
    mainCategory,
    getHighlights,
  } = MenuHooks();
  const clickHandler = (e, name) => {
    e.preventDefault();
    if (name) {
      setCurrentCategory(name.categoryName);
    }
    getMainCategory(name);
  };
  useEffect(() => {
    if (mainCategory?.categoryName === "Highlights") {
      getHighlights(mainCategory);
    }
    if (currentCategory != mainCategory?.categoryName) {
      setIsOpen(!isOpen);
    }
  }, [mainCategory, currentCategory]);
  return (
    <aside className="Menu">
      <div className="Menu-content">
        <div className="Menu-content-text">
          {user ? (
            <span className="Menu-content-text-span">Hello, {user?.name}</span>
          ) : (
            <Link to="/signIn">
              <button>
                <FontAwesomeIcon
                  className="Menu-content-text-icon"
                  icon={faUserCircle}
                />
                Hello, Sign In
              </button>
            </Link>
          )}
        </div>
        <div className="Menu-content-categories-items">
          <div className="Menu-content-categories-item">
            {loading ? (
              "Loading..."
            ) : (
              <div className="Categories-item-main">
                {categories.categories?.map((category, index) => {
                  return (
                    <div className="Categories-item-main-category">
                      <button
                        onClick={(e) => {
                          clickHandler(e, category);
                          setIsOpen(!isOpen);
                        }}
                        className="btn"
                      >
                        <div>
                          {category.categoryName}
                          <FontAwesomeIcon
                            icon={
                              mainCategory?.categoryName ===
                              category.categoryName
                                ? faAngleDown
                                : faAngleRight
                            }
                            className="category-icon"
                          />
                        </div>
                      </button>

                      {mainCategory?.categoryName === category.categoryName &&
                      isOpen &&
                      mainCategory?.categoryName !== "Highlights" ? (
                        <div className="Categories-item-main-card">
                          <CategoryCard category={mainCategory} />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Menu;
