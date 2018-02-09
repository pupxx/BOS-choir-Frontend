import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as actions from "../../../store/actions";

import AdminLayout from "../../admin/adminLayout/AdminLayout";
import Profile from "../../profile/Profile";
import Register from "../../register/Register";
import AdminMemberList from "../../admin/adminMemberList/AdminMemberList";

class AdminLanding extends Component {
  componentWillMount() {
    this.props.fetchMemberInfo();
    this.props.fetchProfile();
  }

  render() {
    return (
      <div>
        <AdminLayout>
          <Switch>
            <Route path="/admin/admin-landing/profile" component={Profile} />
            <Route path="/admin/admin-landing/register" component={Register} />
            <Route
              path="/admin/admin-landing/member-list"
              component={AdminMemberList}
            />
          </Switch>
        </AdminLayout>
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
