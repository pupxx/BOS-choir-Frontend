import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class Signin extends Component {
  // handleFormSubmit({ email, password }) {
  //   console.log(email, password);
  // }

  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input {...field.input} type="field.type" />
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
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
})(Signin);
