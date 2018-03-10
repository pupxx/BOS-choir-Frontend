import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class AdminSinglePerformance extends Component {
  state = {};
  render() {
    return <div>Admin Single Performance component</div>;
  }
}

function mapStateToProps(state) {}

export default connect(mapStateToProps, actions)(AdminSinglePerformance);
