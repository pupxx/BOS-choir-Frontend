import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class Profile extends Component {
  // componentDidMount() {
  //   this.props.fetchProfile();
  // }

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
        <h3>Welcome to the profile page</h3>
      </div>
    );
  }
}

export default connect(null, actions)(Profile);
