import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../store/actions";
import _ from "lodash";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";

class AdminSinglePerformance extends Component {
  state = {};

  componentDidMount() {
    console.log("hello");
    const id = this.props.match.params.id;
    this.props.fetchSinglePerformance(id);
  }

  renderPerformance() {
    return _.map(
      this.props.singlePerformance,
      ({
        performanceID,
        perfname,
        formattedTime,
        churchID,
        churchname,
        churchaddress1,
        churchaddress2,
        churchcity,
        churchphone,
        formattedDate
      }) => {
        return (
          <div key={performanceID}>
            <h5>{perfname}</h5>
            <h5>{formattedDate}</h5>
            <h5>{formattedTime}</h5>
            <h5>{churchname}</h5>
            <h5>{churchaddress1}</h5>
            <h5>{churchaddress2}</h5>
            <h5>{churchcity}</h5>
            <h5>{churchphone}</h5>
            {this.renderPieces()}
          </div>
        );
      }
    );
  }

  renderPieces() {
    return _.map(this.props.singlePerformance.pieces, el => {
      return (
        <div key={el.pieceID}>
          <h5>{el.piecetitle}</h5>
          <h5>{el.perfpieceID}</h5>
        </div>
      );
    });
  }

  render() {
    console.log(this.props.singlePerformance);
    if (!this.props.singlePerformance) {
      return <LoaderWithText />;
    } else {
      return this.renderPerformance();
    }
  }
}

function mapStateToProps(state) {
  return {
    singlePerformance: state.singlePerformance
  };
}

export default withRouter(
  connect(mapStateToProps, actions)(AdminSinglePerformance)
);
