import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";

import classes from "./adminShowSingleMember.css";

class AdminShowSingleMember extends Component {
  state = {};

  componentDidMount() {
    if (!this.props.singleMember) {
      this.props.fetchAdminMemberList();
    }
  }
  render() {
    const {
      firstname,
      lastname,
      address1,
      address2,
      city,
      prov,
      postal,
      church,
      part,
      email
    } = this.props.singleMember;
    if (!this.props.singleMember) {
      return <LoaderWithText />;
    } else {
      return (
        <div className={classes.ShowSingleMember}>
          <h4>
            {firstname} {lastname}
          </h4>
          <address>
            {address1}
            {address2}
            {city} {prov}, {postal}
          </address>
          <h4>{email}</h4>
          <h4>{church}</h4>
          <h4>{part}</h4>
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    adminMemberList: state.adminMemberList,
    singleMember: state.adminMemberList[ownProps.match.params.id]
  };
}
export default connect(mapStateToProps, actions)(AdminShowSingleMember);
