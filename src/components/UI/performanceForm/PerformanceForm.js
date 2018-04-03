import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../../store/actions";

import Aux from "../../../hoc/Aux";
import classes from "./performanceForm.css";

class ChurchForm extends Component {
  state = {};

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

  onSubmit(values) {
    // let location = this.props.location;
    // this.props.action(values, location);
    this.props.removeModal();
  }

  render() {
    const { handleSubmit } = this.props;
    let confirm = `ui mini green button ${classes.Buttons}`;
    let cancel = `ui mini red button ${classes.Buttons}`;
    return (
      <Aux>
        <h5>Add Ward/Branch</h5>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {/* <Field
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
          /> */}
          <button
            type="submit"
            disabled={this.props.pristine}
            className={confirm}
          >
            Submit
          </button>
          <button className={cancel} onClick={e => this.props.cancelAction()}>
            Cancel
          </button>
        </form>
      </Aux>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let value;
  if (ownProps.churchToEdit) {
    value = state.churchs[ownProps.churchToEdit];
  }
  return { initialValues: value };
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    // validate,
    form: "churchform",
    enableReinitialize: true
  })(ChurchForm)
);
