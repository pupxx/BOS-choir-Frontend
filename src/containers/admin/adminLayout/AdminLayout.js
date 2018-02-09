import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Aux from "../../../hoc/Aux";
import AdminToolbar from "../adminToolbar/AdminToolbar";
import AdminMemberList from "../adminMemberList/AdminMemberList";

import classes from "./adminLayout.css";

class AdminLayout extends Component {
  state = {};
  render() {
    let bbl = `ui medium label ${classes.Blue}`;
    return (
      <Aux>
        <AdminToolbar />
        <Link to={"/admin/admin-landing/member-list"} className={bbl}>
          Search Members
        </Link>
        <Link to={"/admin/admin-landing"} className={bbl}>
          Search Performances
        </Link>
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}
function mapStateToProps(state) {
  return { admin: state.isAdmin.admin };
}
export default connect(mapStateToProps, null)(AdminLayout);
