import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../../hoc/Aux";
import AdminToolbar from "../adminToolbar/AdminToolbar";

class AdminLayout extends Component {
  state = {};
  render() {
    return (
      <Aux>
        <AdminToolbar />
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}
function mapStateToProps(state) {
  return { admin: state.isAdmin.admin };
}
export default connect(mapStateToProps, null)(AdminLayout);