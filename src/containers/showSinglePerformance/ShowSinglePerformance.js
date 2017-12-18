import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class ShowSinglePerformance extends Component {
  render() {
    return <p>hi from the show single performance page</p>;
  }
}

function mapStateToProps(state) {
  return { performanceList: state.performanceList };
}

export default connect(mapStateToProps, actions)(ShowSinglePerformance);
