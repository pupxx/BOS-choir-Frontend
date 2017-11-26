import React from "react";
import NavigationItems from "../navigationItems/NavigationItems";
import MenuToggle from "./menuToggleButton/MenuToggle";

import classes from "./toolbar.css";

export default function Toolbar(props) {
  console.log("toolbar", props);
  return (
    <header className={classes.Toolbar}>
      <MenuToggle toggle={props.toggleOpen} />
      <nav className={classes.DesktopOnly}>
        <NavigationItems toggle={props.toggleOpen} />
      </nav>
      <h4>Login</h4>
    </header>
  );
}
