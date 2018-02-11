import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";

// import classes from './adminShowSingleMember.css';

class AdminShowSingleMember extends Component {
  state = {};

  componentDidMount() {
    if (!this.props.singleMember) {
      this.props.fetchAdminMemberList();
    }
  }
  render() {
    console.log(this.props);
    if (!this.props.singleMember) {
      return <LoaderWithText />;
    } else {
      return <h1>{this.props.singleMember.firstname}</h1>;
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
