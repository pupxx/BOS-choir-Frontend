import React, { Component } from "react";
import classes from "./performanceListItem.css";
import { connect } from "react-redux";

class PerformanceListItem extends Component {
  render() {
    return (
      <li className={classes.Listitem}>
        <h5>{this.props.title}</h5>
        <div>{this.props.children}</div>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(PerformanceListItem);
