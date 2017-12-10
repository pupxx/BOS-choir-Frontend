import React, { Component } from "react";
import { connect } from "react-redux";
import PerformanceList from "../performance_list/PerformanceList";
import Rehearsals from "../rehearsals/Rehearsals";

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

export default connect(null, null)(MemberLanding);
