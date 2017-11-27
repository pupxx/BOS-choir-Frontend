import React from "react";
import NavigationItem from "../navigationItem/NavigationItem";

import classes from "./navigationItems.css";

function navigationItems(props) {
  const currentPath = window.location.pathname;

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" toggle={props.toggle}>
        Home
      </NavigationItem>
      {currentPath !== "/performances" ? (
        <NavigationItem
          link="/performances"
          active={true}
          toggle={props.toggle}
        >
          Performances
        </NavigationItem>
      ) : null}
      {currentPath !== "/contacts" ? (
        <NavigationItem link="/contacts" toggle={props.toggle}>
          Leadership Info
        </NavigationItem>
      ) : null}
      {currentPath !== "/rehearsals" ? (
        <NavigationItem link="/rehearsals" toggle={props.toggle}>
          Rehearsals
        </NavigationItem>
      ) : null}
    </ul>
  );
}

export default navigationItems;
