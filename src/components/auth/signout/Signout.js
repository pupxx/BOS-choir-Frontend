import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import Signin from "../signin/Signin";

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }

  render() {
    return (
      <div>
        <h1>GoodBye</h1>
        <Signin />
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
