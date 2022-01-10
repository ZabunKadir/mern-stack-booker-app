import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="app-info">
          <label>Boooker</label>
          <article>
            Boooker, is a web-based book comminucation application with a focus
            on speed and fun.
          </article>
        </div>

        <div className="about">
          <label>About</label>

          <a href="Blog">Blog</a>

          <a href="Developer">Developer</a>

          <a href="Contact">Contact</a>
        </div>

        <div className="social-medias">
          <div>
            <label>Social Medias</label>
          </div>
          <div>
            <a href="">
              <FontAwesomeIcon
                className="fa-social-medias-icon"
                icon={faInstagram}
              ></FontAwesomeIcon>
            </a>
            <a href="">
              <FontAwesomeIcon
                className="fa-social-medias-icon"
                icon={faTwitter}
              ></FontAwesomeIcon>
            </a>
            <a href="">
              <FontAwesomeIcon
                className="fa-social-medias-icon"
                icon={faFacebook}
              ></FontAwesomeIcon>
            </a>
            <a href="">
              <FontAwesomeIcon
                className="fa-social-medias-icon"
                icon={faLinkedin}
              ></FontAwesomeIcon>
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <label>© {year} Copyright: Boooker.net</label>
      </div>
    </div>
  );
};

export default Footer;
