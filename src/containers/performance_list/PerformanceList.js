import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPerformances } from "../../store/actions/index";
import PerformanceListItem from "../performance_list_item/Performance_List_Item";
import Aux from "../../hoc/Aux";

import classes from "./performanceList.css";

class PerformanceList extends Component {
  componentDidMount() {
    this.props.fetchPerformances();
  }

  getPerformances() {
    console.log(this.props.performances);
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPerformances }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceList);
