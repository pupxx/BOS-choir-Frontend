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

  render() {
    console.log(this.props.authenticated);
    const { location, toggleOpen } = this.props;
    return (
      <header className={classes.Toolbar}>
        {location.pathname === "/" ||
        location.pathname === "/signin" ||
        location.pathname === "/signout" ||
        location.pathname === "/signup" ? null : (
          <MenuToggle toggle={toggleOpen} />
        )}
        <nav className={classes.DesktopOnly}>
          <NavigationItems toggle={toggleOpen} />
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
