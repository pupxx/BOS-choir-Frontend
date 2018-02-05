import React, { Component } from "react";
import { connect } from "react-redux";
import PerformanceList from "../performance_list/PerformanceList";
import Rehearsals from "../rehearsals/Rehearsals";
import * as actions from "../../store/actions";

class MemberLanding extends Component {
  render() {
    return (
      <div>
        <PerformanceList />
        <Rehearsals />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { admin: state.isAdmin.admin };
}

export default connect(mapStateToProps, actions)(MemberLanding);
