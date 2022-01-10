import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import Rating from "react-rating";
const RecommendationCard = ({ book, grid }) => {
  const path = "/books/" + `${book?.id}`;
  return (
    <div className="RecommendationCard">
      <div className="RecommendationCard-content">
        <a href={path}>
          <div className="RecommendationCard-content-image">
            <img
              src={
                book?.thumbnailUrl != null || book?.thumbnailUrl === ""
                  ? book?.thumbnailUrl
                  : "https://www.yaseminsungur.com/wp-content/uploads/2012/06/kitap-okuma-aliskanligi_212766.gif"
              }
              class=""
              alt="book"
            />
          </div>
          <div className="RecommendationCard-content-text">
            <h4 className="RecommendationCard-content-text-name">
              {book?.title}
            </h4>
            <span className="RecommendationCard-content-text-author">
              {book?.authors.map((author, index) => (
                <span className="RecommendationCard-content-text-author-item">
                  {author}
                  {index === book?.authors?.length - 1 ? null : author !==
                    "" ? (
                    <span className="RecommendationCard-content-text-author-item-and">
                      &
                    </span>
                  ) : null}
                </span>
              ))}
            </span>
            <div className="RecommendationCard-content-text-rating">
              <div className="RecommendationCard-content-text-rating-rate">
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
              <div className="RecommendationCard-content-text-rating-span">
                ({book?.raters.length})
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
export default RecommendationCard;
