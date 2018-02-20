import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import * as actions from "../../../store/actions";

import AdminLayout from "../../admin/adminLayout/AdminLayout";
import Profile from "../../profile/Profile";
import Register from "../../register/Register";
import AdminMemberList from "../../admin/adminMemberList/AdminMemberList";
import AdminPerformanceList from "../../admin/adminPerformanceList/AdminPerformanceList";
import AdminEditMember from "../adminEditMember/AdminEditMember";

class AdminLanding extends Component {
  componentWillMount() {
    this.props.fetchMemberInfo();
    this.props.fetchProfile();
    this.props.fetchAdminMemberList();
  }

  render() {
    return (
      <div>
        <AdminLayout>
          <Switch>
            <Route path="/admin/admin-landing/profile" component={Profile} />
            <Route path="/admin/admin-landing/register" component={Register} />
            <Route
              path="/admin/admin-landing/performances"
              component={AdminPerformanceList}
            />
            <Route
              path="/admin/admin-landing/member-list"
              component={withRouter(AdminMemberList)}
            />
            <Route
              path="/admin/admin-landing/edit-member/:id"
              component={withRouter(AdminEditMember)}
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
