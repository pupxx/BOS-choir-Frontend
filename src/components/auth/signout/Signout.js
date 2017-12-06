import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Link } from "react-router-dom";

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }

  render() {
    return (
      <div>
        <h1>GoodBye</h1>
        <Link to="/signin">Signin</Link>
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
