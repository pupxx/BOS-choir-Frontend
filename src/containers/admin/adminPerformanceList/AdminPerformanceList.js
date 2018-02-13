import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../../../store/actions";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";

class AdminPerformanceList extends Component {
  state = {};

  componentDidMount() {
    if (!_.map(this.props.adminPerformanceList).length) {
      this.props.fetchAdminPerformanceList();
    }
  }

  render() {
    if (!_.map(this.props.adminPerformanceList).length) {
      return <LoaderWithText />;
    }
    return <div>AdminPerformanceList</div>;
  }
}

const mapStateToProps = state => ({
  adminPerformanceList: state.adminPerformanceList
});

export default connect(mapStateToProps, actions)(AdminPerformanceList);
