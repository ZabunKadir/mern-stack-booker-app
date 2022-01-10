import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import Layout from "../../components/layout";
import BookHooks from "./hooks/bookHooks";
import Rating from "react-rating";
import Recommendation from "../../components/recommendation/recommendation";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faHeart,
  faBookmark,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const BookPage = () => {
  const location = useLocation();
  const {
    convertDate,
    getBookById,
    book,
    favoriteButton,
    readButton,
    toReadButton,
    clickHandler,
    userRatingHandler,
    user,
    useWindowDimensions,
  } = BookHooks();
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [placeholderUser, setPlaceholderUser] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [recNumber, setrecNumber] = useState(3);
  const { width } = useWindowDimensions();
  useEffect(() => {
    getBookById(location.pathname.split("/")[2]);
  }, [location]);
  useEffect(() => {
    if (user && book) {
      setPlaceholderUser(
        user.ratings[user.ratings?.findIndex((item) => item.bookId === book.id)]
          ?.rate
      );
    } else {
      return;
    }
  }, [user, book]);
  useEffect(() => {
    setAuthors(book?.authors);
    setCategories(book?.categories);
  }, [book]);
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
  return (
    <Layout>
      <div className="BookPage">
        <div className="BookPage-content">
          <div className="BookPage-content-top">
            <div className="BookPage-content-top-image">
              <img src={book?.thumbnailUrl} alt="book" />
            </div>
            <div className="BookPage-content-top-table">
              <div className="BookPage-content-top-info-title">
                <h2>{book?.title}</h2>
              </div>
              <Table hover borderless>
                <tbody>
                  <tr>
                    <td className="BookPage-content-top-info-left">
                      Book Author:
                    </td>
                    <td className="BookPage-content-top-info-right">
                      {authors?.map((author, index) => (
                        <span>
                          {author}
                          {index !== authors.length - 1 &&
                            author !== "" && ( //yazarlar arasina ampersand eklenir
                              <span style={{ color: "gray" }}> & </span>
                            )}
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td className="BookPage-content-top-info-left">
                      Page Numbers:
                    </td>
                    <td className="BookPage-content-top-info-right">
                      {book?.pageCount === "0" ? "Unknown" : book?.pageCount}
                    </td>
                  </tr>
                  <tr>
                    <td className="BookPage-content-top-info-left">
                      Published Date:
                    </td>
                    <td className="BookPage-content-top-info-right">
                      {convertDate(book?.publishedDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="BookPage-content-top-info-left">
                      Category:
                    </td>
                    <td className="BookPage-content-top-info-right category">
                      {categories?.map((category, index) => (
                        <div className="BookPage-content-top-category">
                          {category && (
                            <span className="BookPage-content-top-span">
                              {category}
                            </span>
                          )}
                        </div>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td className="BookPage-content-top-info-left">Rate:</td>
                    <td className="BookPage-content-top-info-right">
                      <Rating
                        start={0}
                        stop={5}
                        fractions={2}
                        placeholderRating={
                          book?.totalRate / book?.raters.length
                        }
                        emptySymbol={<FontAwesomeIcon icon={faStar} />}
                        placeholderSymbol={
                          <FontAwesomeIcon
                            style={{ color: "orange" }}
                            icon={faStar}
                          />
                        }
                        readonly={true}
                      />
                      <span className="BookPage-content-top-info-right-span">
                        ({book?.raters.length} votes)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="BookPage-content-bottom">
            <div className="BookPage-content-bottom-info-description">
              <div className="BookPage-content-bottom-info-description-text">
                <h4>Description:</h4>
              </div>
              <div className="BookPage-content-bottom-info-description-article">
                <article>
                  {book?.longDescription === "" || !book?.longDescription ? (
                    <span style={{ color: "darkred" }}>No Content</span>
                  ) : (
                    book?.longDescription
                  )}
                </article>
              </div>
            </div>
          </div>
          <div className="BookPage-content-rating">
            <div className="BookPage-content-rating-text">
              <span>Your Rating :</span>
            </div>
            <div className="BookPage-content-rating-star">
              {
                <Rating
                  placeholderRating={placeholderUser}
                  start={0}
                  stop={5}
                  fractions={2}
                  emptySymbol={<FontAwesomeIcon icon={faStar} />}
                  placeholderSymbol={
                    <FontAwesomeIcon
                      style={{ color: "orange" }}
                      icon={faStar}
                    />
                  }
                  fullSymbol={
                    <FontAwesomeIcon
                      style={{ color: "orange" }}
                      icon={faStar}
                    />
                  }
                  onChange={(e) => userRatingHandler(user, book, e)}
                />
              }
            </div>
          </div>
          <div className="BookPage-content-list">
            <div className="BookPage-content-list-text">
              <span>Do You Want To Add To Your List?</span>
            </div>
            <div className="BookPage-content-list-buttons">
              <button
                className="BookPage-content-list-buttons-item"
                title="Add Favorites List"
                onClick={(e) => clickHandler(e, user, book, "favorite")}
              >
                <FontAwesomeIcon
                  className={
                    favoriteButton
                      ? "BookPage-content-buttons-icon active-favorite"
                      : "BookPage-content-buttons-icon"
                  }
                  icon={faHeart}
                />
              </button>
              <button
                className="BookPage-content-list-buttons-item"
                title="Add Read List"
                onClick={(e) => clickHandler(e, user, book, "readBook")}
              >
                <FontAwesomeIcon
                  className={
                    readButton
                      ? "BookPage-content-buttons-icon active-readBook"
                      : "BookPage-content-buttons-icon"
                  }
                  icon={faArchive}
                />
              </button>
              <button
                className="BookPage-content-list-buttons-item"
                title="Add To-Read List"
                onClick={(e) => clickHandler(e, user, book, "toRead")}
              >
                <FontAwesomeIcon
                  className={
                    toReadButton
                      ? "BookPage-content-buttons-icon active-toRead"
                      : "BookPage-content-buttons-icon"
                  }
                  icon={faBookmark}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="BookPage-recommendation">
          <Recommendation number={recNumber} />
        </div>
      </div>
    </Layout>
  );
};
export default BookPage;
