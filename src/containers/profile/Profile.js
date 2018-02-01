import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import * as actions from "../../store/actions";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfile();
    this.props.fetchMemberInfo();
  }

  render() {
    let memberProfile = _.map(this.props.profile)[0];
    let memberInfo = _.map(this.props.memberInfo)[0];
    if (!memberProfile || !memberInfo) {
      return (
        <Link to="/member/register" className="alert alert-danger">
          Please Click here to complete registration.
        </Link>
      );
    } else {
      console.log(this.props.memberInfo);
      const {
        firstname,
        lastname,
        address1,
        address2,
        city,
        prov,
        postal,
        phone,
        part
      } = memberInfo;
      const { churchname } = memberProfile;
      return (
        <div>
          <h1>
            {firstname} {lastname}
          </h1>
          <h6>{address1}</h6>
          <h6>{address2}</h6>
          <h6>
            {city}, {prov} {postal}
          </h6>
          <h6>{phone}</h6>
          <h6>{churchname}</h6>
          <h6>{part}</h6>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { profile: state.profile, memberInfo: state.memberInfo };
}

export default connect(mapStateToProps, actions)(Profile);
