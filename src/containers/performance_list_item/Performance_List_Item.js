import React, { Component } from "react";
import classes from "./performanceListItem.css";

export default class PerformanceListItem extends Component {
  render() {
    var phrase = (
      <h6 className={classes.NotAttending}>I will not be attending</h6>
    );
    if (this.props.attending) {
      phrase = <h6 className={classes.Attending}>I will be attending</h6>;
    }

    return (
      <li className={classes.Listitem}>
        <h3>{this.props.title}</h3>
        {phrase}
      </li>
    );
  }
}
