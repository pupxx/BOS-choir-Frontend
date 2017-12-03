import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import classes from "./signin.css";

class Signin extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input {...field.input} className="form-control" type={field.type} />
      </div>
    );
  }

  onSubmit(values) {
    let email = values.email;
    let password = values.password;
    this.props.signinUser({ email, password });
  }

  displayError() {
    if (this.props.errorMessage) {
      return <h6>{this.props.errorMessage}</h6>;
    }
  }

  render() {
    const loginButtonStyle = `${
      classes.LoginButton
    } btn btn-primary btn-sm btn-block`;
    const signupButtonStyle = `${
      classes.SignupButton
    } btn btn-primary btn-sm btn-block`;
    const { handleSubmit } = this.props;
    return (
      <form
        className={classes.Form}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      >
        <Field
          name="email"
          label="Email:"
          type="email"
          component={this.renderField}
        />
        <Field
          name="password"
          type="password"
          label="Password:"
          component={this.renderField}
        />
        {this.displayError()}
        <button className={loginButtonStyle} action="submit">
          Login
        </button>
        <hr />
        <Link to="/signup" className={signupButtonStyle}>
          Register
        </Link>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: "signin"
})(connect(mapStateToProps, actions)(Signin));
