import React, { Component } from "react";
import classes from "./performanceListItem.css";
import { connect } from "react-redux";

class PerformanceListItem extends Component {
  render() {
    let liStyle;
    if (this.props.authenticated) {
      if (this.props.attend) {
        liStyle = { backgroundColor: "#ecfeec" };
      } else {
        liStyle = { backgroundColor: "#fff6f6" };
      }
    } else {
      console.log("not authed");
      liStyle = {};
    }
    return (
      <li className={classes.Listitem} style={liStyle}>
        <h6>{this.props.title}</h6>
        <div>{this.props.children}</div>
      </li>
    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}
export default connect(mapStateToProps, null)(PerformanceListItem);
