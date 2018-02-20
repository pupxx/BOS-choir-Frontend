import React from "react";
// import { Table, Form } from "semantic-ui-react";

// import classes from "./searchableTable.css";

function SearchBar(props) {
  return (
    <div className="ui mini input labeled">
      <label className="ui label">{props.title}</label>
      <input type="text" placeholder="Search" onChange={props.handleSearch} />
    </div>
  );
}

export default SearchBar;
