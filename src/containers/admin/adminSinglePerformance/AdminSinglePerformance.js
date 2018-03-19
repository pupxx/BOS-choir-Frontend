import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import _ from "lodash";

class AdminSinglePerformance extends Component {
  state = {};

  renderPieces() {
    return this.props.singlePerformance.pieces.map(el => {
      return (
        <div key={el.pieceID}>
          <h5>{el.piecetitle}</h5>
          <h5>{el.perfpieceID}</h5>
        </div>
      );
    });
  }
  render() {
    const {
      performanceID,
      perfname,
      perfdate,
      perftime,
      churchID,
      churchname,
      churchaddress1,
      churchaddress2,
      churchcity,
      churchphone
    } = this.props.singlePerformance;
    console.log(this.props, "@@@@@@@@@@@@@@@@@");
    return (
      <div>
        <h5>{perfname}</h5>
        <h5>{perfdate}</h5>
        <h5>{perftime}</h5>
        <h5>{churchname}</h5>
        <h5>{churchaddress1}</h5>
        <h5>{churchaddress2}</h5>
        <h5>{churchcity}</h5>
        <h5>{churchphone}</h5>
        {this.renderPieces()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    performanceList: state.performancList,
    singlePerformance: state.performanceList[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, actions)(AdminSinglePerformance);
