import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import ChurchForm from "../../../components/UI/churchForm/ChurchForm";

class AdminAddChurch extends Component {
  state = {};
  render() {
    return <ChurchForm />;
  }
}

export default connect(null, null)(AdminAddChurch);
