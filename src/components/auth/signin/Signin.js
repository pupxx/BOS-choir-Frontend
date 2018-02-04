import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import classes from "./signin.css";

class Signin extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    let className = `form-control ${touched && error ? "is-invalid" : ""}`;
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input {...field.input} className={className} type={field.type} />
        <div className="invalid-feedback">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    let email = values.email;
    let password = values.password;
    this.props.signinUser(
      { email, password },
      () => this.props.history.push("/member/landing"),
      () => this.props.history.push("/member/register"),
      () => this.props.history.push("/admin/admin-landing")
    );
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

function validate(values) {
  const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const whiteSpaceReg = / /;
  const capReg = /[A-Z]/;
  const specCharReg = /[~!@#$&]/;
  const numReg = /[0-9]/;
  const errors = {};

  if (
    !values.email ||
    (values.email && !emailReg.test(values.email)) ||
    whiteSpaceReg.test(values.email) ||
    whiteSpaceReg.test(values.email)
  ) {
    errors.email = "Please enter a valid email.";
  }
  if (
    !values.password ||
    (values.password && values.password.length < 8) ||
    // !specCharReg.test(values.password) ||
    !capReg.test(values.password) ||
    whiteSpaceReg.test(values.password) ||
    !numReg.test(values.password)
  ) {
    errors.password =
      "Password must be 8 characters long, include one capital, one special character, (i.e., ~!@#$&), and a number.";
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: "signin"
})(connect(mapStateToProps, actions)(Signin));
