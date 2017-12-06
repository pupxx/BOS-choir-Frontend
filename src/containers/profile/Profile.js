import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
        <h3>Welcome to the profile page</h3>
      </div>
    );
  }
}

export default connect(null, null)(Profile);
