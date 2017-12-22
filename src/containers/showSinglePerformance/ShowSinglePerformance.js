import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../store/actions";

import Aux from "../../hoc/Aux";

import classes from "./showSinglePerformance.css";

class ShowSinglePerformance extends Component {
  componentDidMount() {
    if (!this.props.performance) {
      this.props.fetchPerformances();
    }
  }

  renderPieces() {
    return this.props.performance.pieces.map((piece, i) => {
      return <li key={i}>{piece.piecetitle}</li>;
    });
  }

  render() {
    if (!this.props.performance) {
      return <div>Loading...</div>;
    }
    const attendingButton = `${classes.Attending} ${
      classes.AttendanceButton
    } btn btn-primary btn-sm btn-block`;
    const notAttending = `${
      classes.AttendanceButton
    } btn btn-primary btn-danger btn-sm btn-block`;
    const {
      attending,
      perfname,
      perfdate,
      perftime,
      menattire,
      womenattire
    } = this.props.performance;
    console.log(this.props.performance);

    return (
      <Aux>
        <h5>{perfname}</h5>
        <h5>{moment(perfdate).format("LL")}</h5>
        <h5>{perftime}</h5>
        <h5>{menattire}</h5>
        <h5>{womenattire}</h5>
        <div>
          <h5>Pieces</h5>
          <ul>{this.renderPieces()}</ul>
        </div>
        <div>
          {attending ? (
            <button className={notAttending}>
              Unfortunately I will NOT be able to attend.
            </button>
          ) : (
            <button className={attendingButton}>
              Notify Choir Director that I Will be attending.
            </button>
          )}
        </div>
      </Aux>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    performance: state.performanceList[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, actions)(ShowSinglePerformance);
