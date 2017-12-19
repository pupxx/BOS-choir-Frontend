import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Aux from "../../hoc/Aux";

class ShowSinglePerformance extends Component {
  render() {
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
        <h5>{perfdate}</h5>
        <h5>{perftime}</h5>
        <h5>{menattire}</h5>
        <h5>{womenattire}</h5>
        <h5>
          {attending ? (
            <button> I will NOT be attending this performance.</button>
          ) : (
            <button>I Will be attending this performance</button>
          )}
        </h5>
      </Aux>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    performance: state.performanceList[ownProps.match.params.id],
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(ShowSinglePerformance);
