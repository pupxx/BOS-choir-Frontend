import React, { Component } from "react";
import { connect } from "react-redux";
import PerformanceList from "../performance_list/PerformanceList";

class MemberLanding extends Component {
  render() {
    return (
      <div>
        <PerformanceList />
      </div>
    );
  }
}

export default connect(null, null)(MemberLanding);
