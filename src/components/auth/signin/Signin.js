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
      () => {
        this.props.history.push("/member/landing");
      },
      () => this.props.history.push("/member/register")
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

function checkForUpperCase(str) {
  const arr = str.split("");
  const hasCap = arr.some(el => {
    if (isNaN(parseInt(el, 10))) {
      return el === el.toUpperCase();
    }
    return false;
  });
  return hasCap;
}

function hasANumber(str) {
  const arr = str.split("");
  const hasNumber = [];
  const mappedArr = arr.map(el => parseInt(el, 10));
  mappedArr.forEach(el => {
    if (el >= 0) {
      hasNumber.push(el);
    }
  });
  if (!hasNumber.length) {
    return false;
  }
  return true;
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter a valid email";
  }
  if (!values.password) {
    errors.password = "Please enter a valid password";
  }
  if (values.password && values.password.length < 8) {
    errors.password =
      "password must be at least 8 characters long and contain at least one capital letter and one number.";
  }
  if (values.password && !hasANumber(values.password)) {
    errors.password =
      "password must be at least 8 characters long and contain at least one capital letter and one number.";
  }
  if (values.password && !checkForUpperCase(values.password)) {
    errors.password =
      "password must be at least 8 characters long and contain at least one capital letter and one number.";
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
