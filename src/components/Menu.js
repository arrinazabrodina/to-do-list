import React from "react";
import { Link } from "react-router-dom";

import "../styles/menu.css";

const Menu = () => {
  return (
    <header>
      <nav className="menu">
        <ul className="menu-list">
          <li className="menu-list__item">
            <Link to="/">Main page</Link>
          </li>
          <li className="menu-list__item">
            <Link to="/newTask">Add new task +</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
