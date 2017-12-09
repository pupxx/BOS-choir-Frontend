import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import NavigationItems from "../navigationItems/NavigationItems";
import MenuToggle from "./menuToggleButton/MenuToggle";

import classes from "./toolbar.css";

class Toolbar extends Component {
  renderSigninOut() {
    if (!this.props.authenticated) {
      return (
        <Link className={classes.Link} to="/signin">
          Login
        </Link>
      );
    } else {
      return (
        <Link onClick={this.signoutUser} className={classes.Link} to="/signout">
          Logout
        </Link>
      );
    }
  }

  // signoutUser() {
  //   this.props.signoutUser();
  // }

  render() {
    console.log(this.props.authenticated);
    // const currentPath = window.location.pathname;
    console.log(this.props.location, "this is the current path");
    return (
      <header className={classes.Toolbar}>
        {this.props.locations === "/" ||
        this.props.locations === "/signin" ||
        this.props.locations === "/signout" ||
        this.props.locations === "/signup" ? null : (
          <MenuToggle toggle={this.props.toggleOpen} />
        )}
        <nav className={classes.DesktopOnly}>
          <NavigationItems toggle={this.props.toggleOpen} />
        </nav>
        {this.renderSigninOut()}
      </header>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}
export default withRouter(connect(mapStateToProps, actions)(Toolbar));
