import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions";

import classes from "./signup.css";

class Signup extends Component {
  onSubmit(values) {
    const { email, password } = values;
    this.props.signupUser({ email, password });
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input {...field.input} className="form-control" type={field.type} />
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

export default reduxForm({
  form: "signup"
})(connect(null, actions)(Signup));
