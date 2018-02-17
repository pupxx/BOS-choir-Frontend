import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../../../store/actions";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";
import Card from "../../../components/card/Card";

import classes from "./adminPerformanceList.css";

class AdminPerformanceList extends Component {
  state = {};

  componentDidMount() {
    if (!_.map(this.props.adminPerformanceList).length) {
      this.props.fetchAdminPerformanceList();
    }
  }

  renderPerformanceInfo() {
    return _.map(this.props.adminPerformanceList).map((el, i) => {
      return (
        <div>
          <Card
            className={classes.Cards}
            key={i}
            header={el.perfname}
            description={<div>{el.perfname}</div>}
          />
        </div>
      );
    });
  }

  render() {
    console.log(this.props);
    if (!_.map(this.props.adminPerformanceList).length) {
      return <LoaderWithText />;
    }
    return (
      <div className={classes.CardWrapper}>{this.renderPerformanceInfo()}</div>
    );
  }
}

const mapStateToProps = state => ({
  adminPerformanceList: state.adminPerformanceList
});

export default connect(mapStateToProps, actions)(AdminPerformanceList);
