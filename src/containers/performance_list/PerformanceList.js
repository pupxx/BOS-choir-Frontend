import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import PerformanceListItem from "../performance_list_item/Performance_List_Item";
import Aux from "../../hoc/Aux";

import classes from "./performanceList.css";

class PerformanceList extends Component {
  componentDidMount() {
    this.props.fetchPerformances();
  }

  getPerformances() {
    return _.map(this.props.performances, (el, i) => {
      if (this.props.authenticated) {
        // var showSingle = this.showSinglePerformance;
        if (!el.attending) {
          var attendance = (
            <h6 className={classes.NotAttending}>
              <button className={classes.AttendingWrapper}>
                I will not be attending
              </button>
              <span className={classes.Carrot}>></span>
            </h6>
          );
        } else {
          attendance = (
            <h6 className={classes.Attending}>
              <button className={classes.NotAttendingWrapper}>
                I will be attending
              </button>
              <span className={classes.Carrot}>></span>
            </h6>
          );
        }
        return (
          <Link to={`/performances/showperformance/${el.id}`} key={el.id}>
            <PerformanceListItem title={el.perfname}>
              {attendance}
            </PerformanceListItem>
          </Link>
        );
      } else {
        return (
          <Link to={`/performances/showperformance/${el.id}`} key={el.id}>
            <PerformanceListItem title={el.perfname} />
          </Link>
        );
      }
    });
  }

  render() {
    return (
      <Aux>
        <h4 className={classes.H3}>Upcoming Performances</h4>
        <ul className={classes.Listitem}>{this.getPerformances()}</ul>
      </Aux>
    );
  }
}

function mapStateToProps(state) {
  return {
    performances: state.performanceList,
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(PerformanceList);
