import React, { Component } from "react";
import classes from "./performanceListItem.css";
import { connect } from "react-redux";

class PerformanceListItem extends Component {
  render() {
    if (this.props.authenticated) {
      if (!this.props.attending) {
        var attendance = (
          <h6 className={classes.NotAttending}>
            I will not be attending <span className={classes.Carrot}>></span>
          </h6>
        );
      } else {
        attendance = (
          <h6 className={classes.Attending}>
            I will be attending <span className={classes.Carrot}>></span>
          </h6>
        );
      }
    }

    return (
      <li className={classes.Listitem}>
        <h5>{this.props.title}</h5>
        {attendance}
      </li>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(PerformanceListItem);
