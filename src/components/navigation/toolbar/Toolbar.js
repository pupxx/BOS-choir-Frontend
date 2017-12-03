import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        <Link onClick={this.signoutUser} className={classes.Link} to="/">
          Logout
        </Link>
      );
    }
  }

  signoutUser() {
    this.props.signoutUser();
  }

  render() {
    console.log(this.props.authenticated);
    const currentPath = window.location.pathname;
    return (
      <header className={classes.Toolbar}>
        {currentPath === "/" || currentPath === "/signin" ? null : (
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
export default connect(mapStateToProps, actions)(Toolbar);
