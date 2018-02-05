import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import requireAuth from "../../../hoc/auth/require_authentication";
import * as actions from "../../../store/actions";

import TestComponent from "../../admin/test/TestComponent";
import Profile from "../../profile/Profile";
import Rehearsals from "../../rehearsals/Rehearsals";

class AdminLanding extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <TestComponent>
          Hello there
          <Route path="/admin/admin-landing/profile" component={Profile} />
        </TestComponent>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    admin: state.isAdmin.admin,
    memberInfo: state.memberInfo,
    profile: state.profile
  };
}

export default connect(mapStateToProps, actions)(AdminLanding);
