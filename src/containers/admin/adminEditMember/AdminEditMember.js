import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";

import classes from "./adminEditMember.css";

class AdminEditMember extends Component {
  state = {};

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.fetchSingleMember(id);
    this.props.fetchChurchs();
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    let className = `form-control form-control-sm ${
      touched && error ? "is-invalid" : ""
    }`;
    return (
      <div className="form-group">
        <label>{field.label}</label>
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
    let gotoLocation = () =>
      this.props.history.push(`/admin/admin-landing/member-list`);
    this.props.updateMemberInfo(values, gotoLocation);
  }

  render() {
    let parts = ["Soprano", "Alto", "Tenor", "Bass"];
    let location = _.map(this.props.churchs, (el, i) => {
      return el.churchname;
    });
    const { handleSubmit } = this.props;

    if (!this.props.adminMemberList[this.props.match.params.id]) {
      return <LoaderWithText />;
    } else {
      return (
        <div className={classes.Layout}>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            className={classes.Form}
          >
            <h4 className={classes.Heading}>Edit Member</h4>
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
          </form>
          <div className={classes.QuickLinks}>
            <h4 className={classes.Heading}>Quick Links</h4>
            <a
              href={`mailto:${
                this.props.adminMemberList[this.props.match.params.id].email
              }`}
            >
              Send Email
            </a>
          </div>
        </div>
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

function mapStateToProps(state, ownProps) {
  return {
    admin: state.isAdmin.admin,
    initialValues: state.adminMemberList[ownProps.match.params.id],
    churchs: state.churchs,
    adminMemberList: state.adminMemberList
  };
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    validate,
    form: "register",
    enableReinitialize: true
  })(AdminEditMember)
);
