import React, { Component } from "react";
import { connect } from "react-redux";

import SearchableTable from "../searchableTable/SearchableTable";

class AdminMemberList extends Component {
  state = {};

  render() {
    return <SearchableTable />;
  }
}

export default connect(null, null)(AdminMemberList);
