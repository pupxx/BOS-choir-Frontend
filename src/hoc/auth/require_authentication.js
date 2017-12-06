import React, { Component } from "react";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push("/");
      }
    }

    // componentWillUpdate(nextProps) {
    //   if (!nextProps.authenication) {
    //     this.props.history.push("/");
    //   }
    // }

    render() {
      console.log(this.props.authenticated);
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
