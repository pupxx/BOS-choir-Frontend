import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import classes from "./register.css";

class Register extends Component {
  renderField(field) {
    return (
      <div>
        <label className={classes.Label}>{field.label}</label>
        <input {...field.input} type={field.type} />
      </div>
    );
  }

  renderProvinceOptions(field) {
    return (
      <div>
        <label>{field.label}</label>
        <select type="select">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    );
  }

  render() {
    return (
      <form className={classes.Form}>
        <h3>Please Register</h3>
        <Field
          name="firstName:"
          label="First Name"
          type="text"
          component={this.renderField}
        />
        <Field
          name="lastName"
          label="Last Name:"
          type="text"
          component={this.renderField}
        />
        <Field
          name="address1"
          label="Address 1:"
          type="text"
          component={this.renderField}
        />
        <Field
          name="address2"
          label="Address 2:"
          type="text"
          component={this.renderField}
        />
        <Field
          name="city"
          label="City:"
          type="text"
          component={this.renderField}
        />
        <Field
          name="postalCode"
          label="Postal Code:"
          type="text"
          component={this.renderField}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: "register"
})(connect(null, null)(Register));
