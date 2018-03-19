import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../store/actions";

import Aux from "../../hoc/Aux";

import classes from "./showSinglePerformance.css";
const twelve = require("twentyfour-to-twelve");

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

  addAttendance() {
    let perfID = this.props.performance.performanceID;
    this.props.addAttendance(perfID);
  }

  removeAttendance() {
    let perfID = this.props.performance.performanceID;
    this.props.removeAttendance(perfID);
  }

  render() {
    if (!this.props.performance) {
      return <div>Loading...</div>;
    }
    const attendingButton = `${
      classes.AttendanceButton
    } btn btn-danger btn-sm btn-block`;
    const notAttending = `${classes.Attending} ${
      classes.AttendanceButton
    } btn btn-primary btn-success btn-sm btn-block`;

    const {
      attending,
      perfname,
      perfdate,
      perftime,
      menattire,
      womenattire,
      churchname,
      churchaddress1,
      churchaddress2,
      churchcity,
      churchphone,
      churchprov
    } = this.props.performance;
    return (
      <Aux>
        <h5>{perfname}</h5>
        <h6>{moment(perfdate).format("LL")}</h6>
        <h6>{twelve(perftime)}</h6>
        <h6>{churchname}</h6>
        <h6>{churchaddress1}</h6>
        <h6>{churchaddress2}</h6>
        <h6>
          {churchcity}, {churchprov}
        </h6>
        <h6>{churchphone}</h6>
        <h6>
          Mens Attire:{" "}
          <span>
            <i>{menattire}</i>
          </span>
        </h6>
        <h6>
          Womens Attire:{" "}
          <span>
            <i>{womenattire}</i>
          </span>
        </h6>
        <div>
          <h6>Choir Music</h6>
          <ul>{this.renderPieces()}</ul>
        </div>
        <div>
          {attending ? (
            <button
              onClick={this.removeAttendance.bind(this)}
              className={notAttending}
            >
              <p className={classes.AttendanceNotification}>
                I am currently attending this performance.
              </p>
              <p className={classes.AttendanceNotification}>
                By clicking this button I will be notifying
              </p>
              <p className={classes.AttendanceNotification}>
                the Choir Director that I will NOT be attending
              </p>
            </button>
          ) : (
            <button
              onClick={this.addAttendance.bind(this)}
              className={attendingButton}
            >
              <p className={classes.AttendanceNotification}>
                I am currently NOT attending this performance.
              </p>
              <p className={classes.AttendanceNotification}>
                By clicking this button I will be notifying
              </p>
              <p className={classes.AttendanceNotification}>
                the Choir Director that I WILL be attending
              </p>
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
