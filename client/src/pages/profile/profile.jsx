import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Button } from "reactstrap";
import Layout from "../../components/layout";
import useProfile from "./hooks/useProfile";
import List from "./list";
import ProfileUpdate from "./profileUpdate";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
const Profile = () => {
  const { profile, currentUser, setName, books, name, searchInList } =
    useProfile();
  const [update, setUpdate] = useState(false);
  return (
    <Layout>
      <div className="Profile">
        <div className="Profile-user">
          <div className="Profile-user-image">
            <img
              src={
                "https://odtukaltev.com.tr/wp-content/uploads/2018/04/person-placeholder.jpg"
              }
              alt="user"
            />
          </div>
          <div className="Profile-user-information">
            <div className="Profile-user-information-name">
              {profile?.name} {profile?.surname}
            </div>
            <div className="Profile-user-information-birthday">
              <div className="Profile-user-information-birthday-text">
                Birthday:
              </div>
              <div className="Profile-user-information-birthday-value">
                {profile?.birthday}
              </div>
            </div>
            <div className="Profile-user-information-gender">
              <div className="Profile-user-information-gender-text">
                Gender:
              </div>
              <div className="Profile-user-information-gender-value">
                {profile?.gender}
              </div>
            </div>

            <div className="Profile-user-information-book">
              <div className="Profile-user-information-book-text">
                Total Books:
              </div>
              <div className="Profile-user-information-book-value">
                <span>
                  {profile?.readBooks ? profile?.readBooks?.length : 0}
                </span>
              </div>
            </div>
            <div className="Profile-user-information-about">
              <div className="Profile-user-information-about-text">About:</div>
              <div className="Profile-user-information-about-items">
                {profile?.about?.instagram === "None" ? null : (
                  <div className="Profile-user-information-about-item">
                    <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    <a
                      href={profile?.about?.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile?.about?.instagram.split("/")[3]}
                    </a>
                  </div>
                )}
                {profile?.about?.facebook === "None" ? null : (
                  <div className="Profile-user-information-about-item">
                    <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                    <a
                      href={profile?.about?.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile?.about?.facebook.split("/")[3]}
                    </a>
                  </div>
                )}
                {profile?.about?.twitter === "None" ? null : (
                  <div className="Profile-user-information-about-item">
                    <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                    <a
                      href={profile?.about?.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile?.about?.twitter.split("/")[3]}
                    </a>
                  </div>
                )}
                {profile?.about?.linkedin === "None" ? null : (
                  <div className="Profile-user-information-about-item">
                    <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
                    <a
                      href={profile?.about?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile?.about?.linkedin.split("/")[3]}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          {profile?._id === currentUser?._id ? (
            <div className="Profile-user-button">
              <Button
                className="Profile-user-button-item btn-dark"
                onClick={() => {
                  setUpdate(!update);
                }}
              >
                {update ? "Open Lists" : "Update"}
              </Button>
            </div>
          ) : null}
        </div>
        {update ? (
          <ProfileUpdate />
        ) : (
          <div className="Profile-book">
            <div className="Profile-book-items">
              <div className="Profile-book-items-button">
                <Button
                  className={
                    name === "readBooks" || !name
                      ? "Profile-book-items-button-item btn-success"
                      : "Profile-book-items-button-item btn-dark"
                  }
                  onClick={() => setName("readBooks")}
                >
                  Read Books
                </Button>
                <Button
                  className={
                    name === "favoriteBooks"
                      ? "Profile-book-items-button-item btn-success"
                      : "Profile-book-items-button-item btn-dark"
                  }
                  onClick={() => setName("favoriteBooks")}
                >
                  Favorite Books
                </Button>
                <Button
                  className={
                    name === "toReadBooks"
                      ? "Profile-book-items-button-item btn-success"
                      : "Profile-book-items-button-item btn-dark"
                  }
                  onClick={() => setName("toReadBooks")}
                >
                  To-Read List
                </Button>
              </div>
              <div className="Profile-book-items-input">
                <input
                  className="Profile-book-items-input-item"
                  type="text"
                  onChange={(e) => {
                    searchInList(profile, name, e.target.value);
                  }}
                  placeholder={
                    name === "readBooks"
                      ? "Search in Read Books"
                      : name === "favoriteBooks"
                      ? "Search in Favorite Books"
                      : name === "toReadBooks"
                      ? "Search in To-Read Books"
                      : "Search in Read Books"
                  }
                />
                <button className="Profile-book-items-input-button">
                  <FontAwesomeIcon
                    className="Profile-book-items-input-icon"
                    icon={faSearch}
                  />
                </button>
              </div>
            </div>
            <div className="Profile-book-table">
              <List books={books} name={name} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Profile;
