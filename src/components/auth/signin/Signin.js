import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Field, reduxForm } from "redux-form";

class Signin extends Component {
  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input {...field.input} type="field.type" />
      </div>
    );
  }

  onSubmit(values) {
    let email = values.email;
    let password = values.password;
    this.props.signinUser({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="email"
          label="Email:"
          type="text"
          component={this.renderField}
        />
        <Field
          name="password"
          label="Password:"
          type="text"
          component={this.renderField}
        />

        <button action="submit">Login</button>
      </form>
    );
  }
}

export default reduxForm({
  form: "signin"
})(connect(null, actions)(Signin));
