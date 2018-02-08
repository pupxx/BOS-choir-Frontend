import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import SearchableTable from "../searchableTable/SearchableTable";

class AdminMemberList extends Component {
  state = {};

  componentWillMount() {
    this.props.fetchAdminMemberList();
  }

  render() {
    console.log(this.props.adminMemberList);
    return <SearchableTable />;
  }
}
function mapstateToProps(state) {
  return { adminMemberList: state.adminMemberList };
}
export default connect(mapstateToProps, actions)(AdminMemberList);
