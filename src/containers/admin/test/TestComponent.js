import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../../hoc/Aux";
import AdminToolBar, { AdminToolbar } from "../adminToolbar/AdminToolbar";

class TestComponent extends Component {
  state = {};
  render() {
    console.log(this.props);
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
export default connect(mapStateToProps, null)(TestComponent);
