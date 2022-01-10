import React from "react";
const NotFound = () => {
  return (
    <div className="container NotFound">
      <div className="NotFound-text">
        <h1 className="NotFound-text-title">404 NOT FOUND</h1>
        <label className="NotFound-text-label">
          Page not found. Please go to homepage!
        </label>
      </div>
      <div className="NotFound-button">
        <a href="/">
          <button className="btn-info btn">Home</button>
        </a>
      </div>
    </div>
  );
};
export default NotFound;
