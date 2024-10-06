import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="imageContainer">
        <h2><Link to="/">Reps & Recipes</Link></h2>
      </div>
      <div className="nav_items">
        <ul>
        <li><Link to="/corporate">R&R Corporate</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/offers">offers</Link></li>
        <li><Link to="/help">Help</Link></li>
        <li><Link to="/">Sign</Link></li>
        <li><Link to="/">Cart</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
