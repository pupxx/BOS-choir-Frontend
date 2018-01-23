import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../store/actions";

import classes from "./register.css";

class Register extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchProfile();
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label className={classes.Label}>{field.label}</label>
        <input
          {...field.input}
          className="form-control"
          type={field.type}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  renderSelect = field => {
    let list = field.options.map((el, i) => {
      return (
        <option key={i} value={el}>
          {el}
        </option>
      );
    });
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <select {...field.input} type="select" className="form-control">
          <option>select</option>
          {list}
        </select>
      </div>
    );
  };

  onSubmit(values) {
    console.log(values);
  }

  render() {
    if (!this.props.initialValues) {
      return <div>loading...</div>;
    } else {
      let parts = ["Soprano", "Alto", "Tenor", "Bass"];
      let location = ["Barrie", "Orilla", "Brampton"];
      const { handleSubmit } = this.props;
      return (
        <form
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
          className={classes.Form}
        >
          <h3>Please Register {this.props.initialValues.firstname}</h3>
          <Field
            name="firstname"
            label="First Name:"
            type="text"
            placeholder="First Name"
            component={this.renderField}
          />
          <Field
            name="lastname"
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
            name="postal"
            label="Postal Code:"
            type="text"
            component={this.renderField}
          />
          <Field
            name="phone"
            label="Phone:"
            type="text"
            component={this.renderField}
          />
          <Field
            name="email"
            label="Email:"
            type="email"
            component={this.renderField}
          />
          <Field
            label="Ward or Branch"
            name="churchname"
            component={this.renderSelect}
            options={location}
            className="form-control"
          />
          <Field
            id="part"
            label="Part"
            name="part"
            component={this.renderSelect}
            options={parts}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      );
    }
  }
}

function mapStateToProps(state) {
  return { initialValues: state.profile[1] };
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: "register",
    enableReinitialize: true
  })(Register)
);
