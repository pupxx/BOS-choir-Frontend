import ShowSinglePerformance from "../../containers/showSinglePerformance/ShowSinglePerformance";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as actions from "../../store/actions";

import Layout from "../layout/Layout";
import About from "../about/About";
import PerformanceList from "../../containers/performance_list/PerformanceList";
import Rehearsals from "../../containers/rehearsals/Rehearsals";
import Signup from "../../components/auth/signup/Signup";
import Signin from "../../components/auth/signin/Signin";
import Signout from "../../components/auth/signout/Signout";
import Profile from "../../containers/profile/Profile";
import Register from "../../containers/register/Register";
import MemberLanding from "../../containers/memberLanding/MemberLanding";
import requireAuth from "../../hoc/auth/require_authentication";
import requireAdmin from "../../hoc/authorize/Authorize";
import AdminLanding from "../../containers/admin/adminLanding/AdminLanding";

// import classes from './app.css';

class App extends Component {
  componentWillMount() {
    let location = this.props.history.location.pathname;
    if (this.props.authenticated && location === "/") {
      let admin = () => this.props.history.push("/admin/admin-landing");
      this.props.isAdmin(() => {}, admin);
      this.props.history.push("/member/landing");
    } else {
      this.props.history.push(location);
    }
  }

  renderAboutandPerformances() {
    return (
      <div>
        <About />
        <PerformanceList />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route
              path="/member/landing"
              component={requireAuth(MemberLanding)}
            />
            <Route path="/profile" component={requireAuth(Profile)} />
            <Route path="/member/register" component={requireAuth(Register)} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route path="/rehearsals" component={requireAuth(Rehearsals)} />
            <Route
              path="/performances/showperformance/:id"
              component={requireAuth(ShowSinglePerformance)}
            />
            <Route path="/" render={this.renderAboutandPerformances} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    admin: state.isAdmin.admin
  };
}

export default connect(mapStateToProps, actions)(App);
