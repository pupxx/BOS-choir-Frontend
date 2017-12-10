import React from "react";
import NavigationItem from "../navigationItem/NavigationItem";
import { withRouter } from "react-router-dom";

import classes from "./navigationItems.css";

function navigationItems(props) {
  const location = props.location;
  // const currentPath = window.location.pathname;

  return (
    <ul className={classes.NavigationItems}>
      {location.pathname === "/" ? null : (
        <NavigationItem link="/member/landing" toggle={props.toggle}>
          Home
        </NavigationItem>
      )}
      {location.pathname !== "/performances" ? (
        <NavigationItem
          link="/performances"
          active={true}
          toggle={props.toggle}
        >
          Performances
        </NavigationItem>
      ) : null}
      {location.pathname !== "/contacts" ? (
        <NavigationItem link="/contacts" toggle={props.toggle}>
          Leadership Info
        </NavigationItem>
      ) : null}
      {location.pathname !== "/rehearsals" ? (
        <NavigationItem link="/rehearsals" toggle={props.toggle}>
          Rehearsals
        </NavigationItem>
      ) : null}
    </ul>
  );
}

export default withRouter(navigationItems);
