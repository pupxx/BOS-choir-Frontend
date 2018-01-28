import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../../store/actions";

import classes from "./signup.css";

class Signup extends Component {
  onSubmit(values) {
    const { email, password } = values;
    this.props.signupUser({ email, password }, () => {
      this.props.history.push("/signin");
    });
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-control ${touched && error ? "is-invalid" : ""}`;
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input {...field.input} className={className} type={field.type} />
        {touched ? error : ""}
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const signupButtonStyle = `${
      classes.SignupButton
    } btn btn-primary btn-sm btn-block`;
    return (
      <form
        className={classes.Form}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      >
        <Field
          name="email"
          label="Email: "
          type="email"
          component={this.renderField}
        />
        <Field
          name="password"
          label="Password:"
          type="password"
          component={this.renderField}
        />
        <Field
          name="confirmPassword"
          label="Confirm Password:"
          type="password"
          component={this.renderField}
        />
        <button action="submit" className={signupButtonStyle}>
          Register
        </button>
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
    !specCharReg.test(values.password) ||
    !capReg.test(values.password) ||
    whiteSpaceReg.test(values.password) ||
    !numReg.test(values.password)
  ) {
    errors.password =
      "Password must be 8 characters, include one capital, one special character, (i.e., ~!@#$&), and a number.";
  }

  if (!values.confirmPassword || values.password !== values.confirmPassword) {
    errors.confirmPassword = "Oops! Passwords do not match.";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "signup"
})(connect(null, actions)(Signup));
