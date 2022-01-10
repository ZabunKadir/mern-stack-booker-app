import React, { useState, useEffect } from "react";

import { Button } from "reactstrap";
import Layout from "../../components/layout";
import Menu from "../../components/menu/menu";

import Book from "../book/book";
import SearchUser from "../profile/profileSearch";
import Recommendation from "../../components/recommendation/recommendation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faTh,
  faTrashAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import useHome from "./hooks/useHome";

const Home = () => {
  const [pageGrid, setPageGrid] = useState(2);
  const {
    selectedCategory,
    deleteCategory,
    mainCategory,
    useWindowDimensions,
  } = useHome();
  const [search, setSearch] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [toggle, setToggle] = useState(false);
  const [recNumber, setrecNumber] = useState(3);
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width < 768) {
      setToggle(true);
    } else {
      setToggle(false);
    }
    if (toggle) {
      setrecNumber(1);
    } else {
      setrecNumber(3);
    }
  }, [width, toggle]);
  const searchHandler = (e, type) => {
    e.preventDefault();
    setSearchValue(search);
    if (type === "user") {
      setSearchingUser(true);
    } else {
      setSearchingUser(false);
    }
    setSearch("");
  };
  return (
    <Layout>
      <div className="Home">
        {!searchingUser ? (
          <div className="Home-menu">
            <Menu />
          </div>
        ) : null}
        <div className="Main">
          <div className="Main-page-controls">
            <div className="Main-page-controls-text">
              <h3>
                {!searchingUser
                  ? mainCategory?.categoryName
                    ? mainCategory?.categoryName
                    : "All Books"
                  : "Results for " + searchValue + " in users"}
              </h3>
            </div>
            <div className="Main-page-controls-search">
              <div className="Main-page-controls-search-input">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (e.target.value === "") {
                      setSearchValue("");
                    }
                  }}
                />
                <FontAwesomeIcon
                  className="Main-page-controls-search-icon"
                  icon={faSearch}
                ></FontAwesomeIcon>
              </div>

              {search !== "" ? (
                <div className="Main-page-controls-search-area">
                  <div className="Main-page-controls-search-area-group">
                    <button
                      onClick={(e) => {
                        searchHandler(e, "book");
                      }}
                      disabled={search ? false : true}
                    >
                      {search !== "" ? (
                        <span>
                          Search for{" "}
                          <span style={{ color: "orange" }}>"{search}"</span> in
                          the books
                        </span>
                      ) : (
                        <span>Please enter the book to be searched</span>
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        searchHandler(e, "user");
                      }}
                      disabled={search ? false : true}
                    >
                      {search !== "" ? (
                        <span>
                          Search for{" "}
                          <span style={{ color: "orange" }}>"{search}"</span> in
                          the users
                        </span>
                      ) : (
                        <span>Please enter the user to be searched</span>
                      )}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            {!toggle ? (
              <div className="Main-page-controls-type">
                <button
                  className={
                    pageGrid === 2
                      ? "Main-page-controls-type-button-active"
                      : "Main-page-controls-type-button"
                  }
                  onClick={() => setPageGrid(2)}
                >
                  <FontAwesomeIcon
                    className="Main-page-controls-type-icon"
                    icon={faThLarge}
                  ></FontAwesomeIcon>
                </button>
                <button
                  className={
                    pageGrid === 3
                      ? "Main-page-controls-type-button-active"
                      : "Main-page-controls-type-button"
                  }
                  onClick={() => setPageGrid(3)}
                >
                  <FontAwesomeIcon
                    className="Main-page-controls-type-icon"
                    icon={faTh}
                  ></FontAwesomeIcon>
                </button>
              </div>
            ) : null}
          </div>
          <div className="Main-category">
            {selectedCategory?.map((a, index) => {
              return (
                <div className="Main-category-selected">
                  {a ? (
                    <Button color="danger" onClick={() => deleteCategory(a)}>
                      <FontAwesomeIcon
                        className="Main-category-selected-icon"
                        icon={faTrashAlt}
                      />
                      {a}
                    </Button>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="Main-content">
            <div className="Main-content-books">
              {!searchingUser ? (
                <Book pageGrid={pageGrid} search={searchValue}></Book>
              ) : (
                <SearchUser search={searchValue}></SearchUser>
              )}
            </div>
          </div>
          <div>
            <Recommendation number={recNumber}></Recommendation>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
