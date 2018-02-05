import React, { Component } from "react";
import { connect } from "react-redux";
import { reset, Field, reduxForm } from "redux-form";
import * as actions from "../../store/actions";
import _ from "lodash";

import classes from "./register.css";

class Register extends Component {
  componentDidMount() {
    this.props.fetchMemberInfo();
    this.props.fetchProfile();
    this.props.fetchChurchs();
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    let className = `form-control ${touched && error ? "is-invalid" : ""}`;
    return (
      <div className="form-group">
        <label className={classes.Label}>{field.label}</label>
        <input
          {...field.input}
          className={className}
          type={field.type}
          placeholder={field.placeholder}
        />
        {touched ? error : ""}
      </div>
    );
  }

  renderSelect = field => {
    const { meta: { touched, error } } = field;
    let className = `form-control ${touched && error ? "is-invalid" : ""}`;

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
        <select
          {...field.input}
          type="select"
          className={className}
          placeholder={field.placeholder}
        >
          <option>select</option>
          {list}
        </select>
        {touched ? error : ""}
      </div>
    );
  };

  onSubmit(values) {
    if (this.props.admin) {
      var location = () =>
        this.props.history.push("/admin/admin-landing/profile");
    } else {
      location = () => this.props.history.push("/profile");
    }
    this.props.updateMemberProfile(values, location);
  }

  render() {
    let parts = ["Soprano", "Alto", "Tenor", "Bass"];
    let location = _.map(this.props.churchs, (el, i) => {
      return el.churchname;
    });
    const { handleSubmit } = this.props;

    if (!location[0]) {
      return <div>Loading...</div>;
    } else {
      return (
        <form
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
          className={classes.Form}
        >
          <h3>Please Register</h3>
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
            placeholder="Last Name"
          />
          <Field
            name="address1"
            label="Address 1:"
            type="text"
            component={this.renderField}
            placeholder="Address 1"
          />
          <Field
            name="address2"
            label="Address 2:"
            type="text"
            component={this.renderField}
            placeholder="Address 2"
          />
          <Field
            name="city"
            label="City:"
            type="text"
            component={this.renderField}
            placeholder="City"
          />
          <Field
            name="postal"
            label="Postal Code:"
            type="text"
            component={this.renderField}
            placeholder="Postal Code"
          />
          <Field
            name="phone"
            label="Phone:"
            type="text"
            component={this.renderField}
            placeholder="Phone"
          />
          <Field
            name="churchname"
            label="Ward or Branch"
            component={this.renderSelect}
            options={location}
            className="form-control"
            placeholder="Ward or Branch"
          />
          <Field
            name="part"
            label="Part"
            component={this.renderSelect}
            options={parts}
            className="form-control"
            placeholder="Part"
          />
          <button
            type="submit"
            disabled={this.props.pristine}
            className="btn btn-primary"
          >
            Submit
          </button>
          {this.props.pristine ? (
            <div>You must make a change to the form before submitting</div>
          ) : (
            ""
          )}
        </form>
      );
    }
  }
}

function validate(values) {
  const postalRegex = /(([A-Z][0-9][A-Z])( )([0-9][A-Z][0-9]))/;
  const phoneRegex = /(([2-9]{1}\d{2})(-)([2-9]{1}\d{2})(-)(\d{4}))/;
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "Please enter a valid first name.";
  }
  if (!values.lastname) {
    errors.lastname = "Please enter a valid last name.";
  }
  if (!values.address1) {
    errors.address1 = "Please enter a valid address.";
  }
  if (!values.city) {
    errors.city = "Please enter a valid city.";
  }
  if (values.postal && (values.postal.length < 7 || values.postal.length > 7)) {
    errors.postal = "Please enter a valid Postal Code (i.e., L0L 1N0).";
  }
  if (!values.postal || (values.postal && !postalRegex.test(values.postal))) {
    errors.postal = "Please enter a valid Postal Code (i.e., L0L 1N0).";
  }
  if (values.phone && (values.phone.length < 12 || values.phone.length > 12)) {
    errors.phone = "Please enter a valid phone (i.e., 555-555-5555).";
  }
  if (!values.phone || (values.phone && !phoneRegex.test(values.phone))) {
    errors.phone = "Please enter a valid phone (i.e., 555-555-5555).";
  }
  if (!values.churchname || values.churchname === "select") {
    errors.churchname = "Please select your Branch or Ward.";
  }
  if (!values.part || values.part === "select") {
    errors.part = "Please select which part you sing.";
  }

  return errors;
}

function mapStateToProps(state) {
  let profile = _.map(state.profile);
  return {
    admin: state.isAdmin.admin,
    profile: state.profile,
    initialValues: profile[0],
    churchs: state.churchs,
    memberInfo: state.memberInfo
  };
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    validate,
    form: "register",
    enableReinitialize: true
  })(Register)
);

// export default reduxForm({
//   validate,
//   form: "register",
//   enableReinitialize: true
// })(connect(mapStateToProps, actions)(Register));
