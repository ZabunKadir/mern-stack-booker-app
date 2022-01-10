import React, { useState, useEffect } from "react";
import useProfile from "./hooks/useProfile";
import ErrorMessage from "../../components/card/errorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "reactstrap";

const UpdateProfile = () => {
  const { error, profile, updateProfileByData } = useProfile();
  const initialState = {
    _id: profile?._id,
    name: profile?.name,
    surname: profile?.surname,
    email: profile?.email,
    password: null,
    birthday: profile?.birthday,
    gender: profile?.gender,
    instagram: profile?.about?.instagram,
    twitter: profile?.about?.twitter,
    facebook: profile?.about?.facebook,
    linkedin: profile?.about?.linkedin,
    image: profile?.image,
  };

  const [formData, setFormData] = useState(initialState);
  const [currentImage, setCurrentImage] = useState("");
  const [instagramChange, setInstagramChange] = useState(false);
  const [twitterChange, setTwitterChange] = useState(false);
  const [facebookChange, setFacebookChange] = useState(false);
  const [linkedinChange, setLinkedinChange] = useState(false);
  const handleSubmit = (e, data) => {
    e.preventDefault();
    const photo = new FormData();
    photo.append("image", currentImage);
    updateProfileByData(data, photo, localStorage.getItem("profile")?.token);
    //window.location.reload();
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePhoto = (e) => {
    setCurrentImage(e.target.files[0]);
  };
  return (
    <div className="Profile-update">
      {error ? (
        <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          <ErrorMessage variant="danger">Profile Not Updated!</ErrorMessage>
        </div>
      ) : null}
      <form
        onSubmit={(e) => handleSubmit(e, formData)}
        encType="multipart/form-data"
      >
        <div className="Profile-update-item">
          <label for="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={profile?.name}
            onChange={handleChange}
          />
        </div>

        <div className="Profile-update-item">
          <label for="surname">Surname:</label>
          <input
            type="text"
            name="surname"
            id="surname"
            placeholder={profile?.surname}
            onChange={handleChange}
          />
        </div>
        <div className="Profile-update-item">
          <label for="email">E-mail:</label>
          <span className="Profile-update-item-info">
            Please enter unused email before
          </span>
          <input
            type="text"
            name="email"
            id="email"
            placeholder={profile?.email}
            onChange={handleChange}
          />
        </div>
        <div className="Profile-update-item">
          <label for="password">Password:</label>
          <span className="Profile-update-item-info">
            Please enter a different password than your previous password
          </span>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="Profile-update-item">
          <label for="birthday">Birthday:</label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            placeholder={profile?.birthday}
            onChange={handleChange}
          />
        </div>
        <div className="Profile-update-item">
          <label for="gender">Gender:</label>
          <select
            name="gender"
            id="gender"
            value="None"
            onChange={handleChange}
          >
            <option value="None">None</option>
            <option value="Gentleman">Gentleman</option>
            <option value="Lady">Lady</option>
          </select>
        </div>
        <div className="Profile-update-item">
          <label>About:</label>
          <span className="Profile-update-item-info">
            Please enter full link
          </span>
          <div className="Profile-update-item-about">
            <div className="Profile-update-item-about-icon">
              <FontAwesomeIcon
                className="Profile-update-item-icon"
                icon={faInstagram}
              />
            </div>
            {instagramChange ? (
              <input
                type="text"
                name="instagram"
                placeholder={profile?.about?.instagram}
                id="instagram"
                onChange={handleChange}
              />
            ) : (
              <div className="Profile-update-item-about-value">
                {profile?.about?.instagram}
              </div>
            )}
            <div className="Profile-update-item-about-button">
              <button onClick={() => setInstagramChange(!instagramChange)}>
                {instagramChange ? "Cancel" : "Change"}
              </button>
            </div>
          </div>
          <div className="Profile-update-item-about">
            <div className="Profile-update-item-about-icon">
              <FontAwesomeIcon
                className="Profile-update-item-icon"
                icon={faFacebook}
              />
            </div>
            {facebookChange ? (
              <input
                type="text"
                name="facebook"
                id="facebook"
                placeholder={profile?.about?.facebook}
                onChange={handleChange}
              />
            ) : (
              <div className="Profile-update-item-about-value">
                {profile?.about?.facebook}
              </div>
            )}
            <div className="Profile-update-item-about-button">
              <button onClick={() => setFacebookChange(!facebookChange)}>
                {facebookChange ? "Cancel" : "Change"}
              </button>
            </div>
          </div>
          <div className="Profile-update-item-about">
            <div className="Profile-update-item-about-icon">
              <FontAwesomeIcon
                className="Profile-update-item-icon"
                icon={faTwitter}
              />
            </div>
            {twitterChange ? (
              <input
                type="text"
                name="twitter"
                id="twitter"
                placeholder={profile?.about?.twitter}
                onChange={handleChange}
              />
            ) : (
              <div className="Profile-update-item-about-value">
                {profile?.about?.twitter}
              </div>
            )}
            <div className="Profile-update-item-about-button">
              <button onClick={() => setTwitterChange(!twitterChange)}>
                {twitterChange ? "Cancel" : "Change"}
              </button>
            </div>
          </div>
          <div className="Profile-update-item-about">
            <div className="Profile-update-item-about-icon">
              <FontAwesomeIcon
                className="Profile-update-item-icon"
                icon={faLinkedin}
              />
            </div>
            {linkedinChange ? (
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                placeholder={profile?.about?.linkedin}
                onChange={handleChange}
              />
            ) : (
              <div className="Profile-update-item-about-value">
                {profile?.about?.linkedin}
              </div>
            )}
            <div className="Profile-update-item-about-button">
              <button onClick={() => setLinkedinChange(!linkedinChange)}>
                {linkedinChange ? "Cancel" : "Change"}
              </button>
            </div>
          </div>
        </div>
        <div className="Profile-update-item">
          <label>Profile Image:</label>
          <span className="Profile-update-item-info">
            Please select the image file you want to use
          </span>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            name="photo"
            onChange={handlePhoto}
          />
        </div>
        <div className="Profile-update-button">
          <Button className="Profile-update-button-item btn-dark" type="submit">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
export default UpdateProfile;
