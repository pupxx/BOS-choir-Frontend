import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import Aux from "../../../hoc/Aux";

class ChurchForm extends Component {
  state = {
    renderModal: false
  };

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

  render() {
    return (
      <Aux>
        <form>
          <Field
            name="churchname"
            label="Ward/Branch:"
            type="text"
            placeholder="Church Name"
            component={this.renderField}
          />
          <Field
            name="churchaddress1"
            label="Address Line 1:"
            type="text"
            placeholder="Address"
            component={this.renderField}
          />
          <Field
            name="churchaddress2"
            label="Address Line 2:"
            type="text"
            placeholder="Address"
            component={this.renderField}
          />
          <Field
            name="churchcity"
            label="City:"
            type="text"
            placeholder="City"
            component={this.renderField}
          />
          <Field
            name="churchzip"
            label="Postal Code:"
            type="text"
            placeholder="Postal Code"
            component={this.renderField}
          />
          <Field
            name="churchphone"
            label="Phone:"
            type="text"
            placeholder="Phone"
            component={this.renderField}
          />
        </form>
      </Aux>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps)(
  reduxForm({
    // validate,
    form: "churchform",
    enableReinitialize: true
  })(ChurchForm)
);
