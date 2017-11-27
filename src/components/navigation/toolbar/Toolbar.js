import React from "react";
import { Link } from "react-router-dom";
import NavigationItems from "../navigationItems/NavigationItems";
import MenuToggle from "./menuToggleButton/MenuToggle";

import classes from "./toolbar.css";

export default function Toolbar(props) {
  const currentPath = window.location.pathname;
  return (
    <header className={classes.Toolbar}>
      {currentPath === "/" || currentPath === "/signin" ? null : (
        <MenuToggle toggle={props.toggleOpen} />
      )}

      <nav className={classes.DesktopOnly}>
        <NavigationItems toggle={props.toggleOpen} />
      </nav>
      {/* {currentPath === "/signin" ? (
        <Link className={classes.Link} to="/">
          Home
        </Link>
      ) : null} */}
      <Link className={classes.Link} to="/signin">
        Login
      </Link>
    </header>
  );
}
