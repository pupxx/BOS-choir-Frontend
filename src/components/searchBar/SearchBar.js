import React from "react";
// import { Table, Form } from "semantic-ui-react";

import classes from "./searchBar.css";

function SearchBar(props) {
  return (
    <div className={classes.SearchBarWrapper}>
      <label className={classes.Label}>{props.title}</label>
      <input
        className={classes.Input}
        type="text"
        placeholder="Search"
        onChange={props.handleSearch}
      />
    </div>
  );
}

export default SearchBar;
