import React from "react";
import "../App.css";

const Header = ({ handleOnSubmit, handleOnChange, search }) => {
  return (
    <div className="header">
      <form onSubmit={handleOnSubmit}>
        <input
          className="search"
          placeholder="Search movies..."
          type="text"
          value={search}
          onChange={handleOnChange}
        />
      </form>
    </div>
  );
};

export default Header;
