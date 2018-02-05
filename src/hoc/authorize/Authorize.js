import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import LoaderWithText from "../../components/UI/loaders/LoaderWithText";

export default function(ComposedComponent) {
  class RequireAdmin extends Component {
    componentWillMount() {
      const memberLocation = () => this.props.history.push("/member/landing");
      const adminLocation = () => this.props.location.pathname;
      if (!this.props.admin) {
        this.props.isAdmin(memberLocation, adminLocation);
      }
    }

    render() {
      console.log("admin", this.props.admin);
      console.log("authenticated", this.props.authenticated);
      if (!this.props.admin) {
        return <LoaderWithText />;
      } else {
        return <ComposedComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps(state) {
    return {
      admin: state.isAdmin.admin,
      authenticated: state.auth.authenticated
    };
  }

  return connect(mapStateToProps, actions)(RequireAdmin);
}
