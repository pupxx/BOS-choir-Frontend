import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
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
      return <PerformanceListItem key={i} data={el.perfname} />;
    });
  }

  render() {
    return (
      <Aux>
        <h3 className={classes.H3}>Performances</h3>
        <ul className={classes.Listitem}>{this.getPerformances()}</ul>
      </Aux>
    );
  }
}

function mapStateToProps(state) {
  return { performances: state.performanceList };
}

export default connect(mapStateToProps, actions)(PerformanceList);
