import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Field, reduxForm } from "redux-form";

class Signin extends Component {
  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input {...field.input} type={field.type} />
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
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
        <button action="submit">Login</button>
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
