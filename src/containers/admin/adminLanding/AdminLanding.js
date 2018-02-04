import React, { Component } from "react";
import { connect } from "react-redux";

class AdminLanding extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Admin Landing Page</h3>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    admin: state.isAdmin.admin,
    memberInfo: state.memberInfo
  };
}

export default connect(mapStateToProps, null)(AdminLanding);
