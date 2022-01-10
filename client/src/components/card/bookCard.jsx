import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faAngleRight,
  faAngleDoubleRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import Rating from "react-rating";
import { useDispatch } from "react-redux";
import { lastClicked } from "../../store/tracker";
const BookCard = ({ book, grid }) => {
  const dispacth = useDispatch();
  const [mouseOver, setMouseOver] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );
  const userTracker = async (user, book) => {
    if (user && book) {
      await dispacth(lastClicked(user, book));
    } else return;
  };
  return (
    <div className={grid === 2 ? "Book" : "Book-thr"}>
      <div className="Book-content">
        <a href={"/books/" + book.id} onClick={() => userTracker(user, book)}>
          <div className="Book-content-image">
            <img
              src={
                book.thumbnailUrl != null || book.thumbnailUrl === ""
                  ? book.thumbnailUrl
                  : "https://www.yaseminsungur.com/wp-content/uploads/2012/06/kitap-okuma-aliskanligi_212766.gif"
              }
              class=""
              alt="book"
            />
          </div>
          <div className="Book-content-text">
            <h4 className="Book-content-text-name">{book.title}</h4>
            <span className="Book-content-text-author">
              {book.authors.map((author, index) => (
                <span className="Book-content-text-author-item">
                  {author}
                  {index === book.authors.length - 1 ? null : author !== "" ? (
                    <span className="Book-content-text-author-item-and">&</span>
                  ) : null}
                </span>
              ))}
            </span>
            <div className="Book-content-text-rating">
              <div className="Book-content-text-rating-rate">
                <Rating
                  start={0}
                  stop={5}
                  fractions={2}
                  placeholderRating={book?.totalRate / book?.raters.length}
                  emptySymbol={<FontAwesomeIcon icon={faStar} />}
                  placeholderSymbol={
                    <FontAwesomeIcon
                      style={{ color: "orange" }}
                      icon={faStar}
                    />
                  }
                  readonly={true}
                />
              </div>
              <div className="Book-content-text-rating-span">
                ({book?.raters.length})
              </div>
            </div>

            <article className="Book-content-text-description">
              {book.shortDescription}
            </article>
          </div>
          <div className="Book-content-button">
            <button
              onMouseOver={() => {
                setMouseOver(true);
              }}
              onMouseOut={() => {
                setMouseOver(false);
              }}
              className="Book-content-button-item"
            >
              Details
              {mouseOver ? (
                <FontAwesomeIcon
                  className="Book-content-button-item-icon"
                  icon={faAngleDoubleRight}
                />
              ) : (
                <FontAwesomeIcon
                  className="Book-content-button-item-icon"
                  icon={faAngleRight}
                />
              )}
            </button>
          </div>
        </a>
      </div>
    </div>
  );
};
export default BookCard;
