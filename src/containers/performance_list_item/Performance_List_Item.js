import React, { Component } from "react";
import classes from "./performanceListItem.css";
import { connect } from "react-redux";

class PerformanceListItem extends Component {
  render() {
    if (this.props.authenticated) {
      if (!this.props.attending) {
        var phrase = (
          <h6 className={classes.NotAttending}>I will not be attending</h6>
        );
      } else {
        phrase = <h6 className={classes.Attending}>I will be attending</h6>;
      }
    }

    return (
      <li className={classes.Listitem}>
        <h3>{this.props.title}</h3>
        {phrase}
      </li>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(PerformanceListItem);
