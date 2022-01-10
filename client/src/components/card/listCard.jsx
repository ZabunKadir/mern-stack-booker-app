import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faExternalLinkAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getProfile } from "../../store/profile";
const ListCard = ({ items, number, currentProfile, buttonType }) => {
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const [listName, setListName] = useState("");
  function CopyButton(item) {
    const url = document.createElement("input");
    url.value = API.defaults.baseURL + "/books/" + item?.id;
    document.body.appendChild(url);
    url.select();
    document.execCommand("Copy");
    document.body.removeChild(url);
    setCopied(true);
  }

  useEffect(() => {
    if (buttonType == null) {
      setListName("readBooks");
    } else {
      setListName(buttonType);
    }
  }, [buttonType]);
  const deleteList = async (e, user, book, type) => {
    if (user) {
      e.preventDefault();
      const token = JSON.parse(localStorage.getItem("profile"))?.token;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: { token },
        },
      };
      const res = await API.post(
        "/users/profile/" + user._id + "/deleteBook",
        {
          book,
          type,
          token,
        },
        config
      );
      localStorage.setItem("profile", JSON.stringify(res.data));
      dispatch(getProfile(location.pathname));
    } else {
      return;
    }
  };

  return (
    <div className={number % 2 === 0 ? "ListCard even" : "ListCard"}>
      <div className="ListCard-item">{number}</div>
      <div className="ListCard-item">{items.title}</div>
      <div className="ListCard-item">
        {items.authors.map((author, index) => (
          <span className="Book-content-text-author-item">
            {author}
            {index === items.authors.length - 1 ? null : author !== "" ? (
              <span className="Book-content-text-author-item-and">&</span>
            ) : null}
          </span>
        ))}
      </div>

      <div className="ListCard-item">
        <Link to={"/books/" + items.id} className="Profile-book-table-link">
          Go Book
        </Link>
      </div>
      <div className="ListCard-item">
        <div className="Profile-book-table-buttons">
          {user?._id === currentProfile?._id ? (
            <button
              className="Profile-book-table-buttons-item delete-button"
              onClick={(e) => deleteList(e, user, items, listName)}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="Profile-book-table-buttons-icon"
              />
            </button>
          ) : null}
          <button
            className="Profile-book-table-buttons-item copy-button"
            title="Copy Link"
            onClick={() => CopyButton(items)}
          >
            {!copied ? (
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                className="Profile-book-table-buttons-icon"
              />
            ) : (
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="Profile-book-table-buttons-icon"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ListCard;
