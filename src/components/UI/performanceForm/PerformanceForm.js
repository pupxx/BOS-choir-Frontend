import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../../store/actions";

import Aux from "../../../hoc/Aux";
import classes from "./performanceForm.css";

class PerformanceForm extends Component {
  state = {};

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
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
    let location = this.props.location;
    this.props.action(values, location);
    this.props.removeModal();
  }

  render() {
    const { handleSubmit } = this.props;
    let confirm = `ui mini green button ${classes.Buttons}`;
    let cancel = `ui mini red button ${classes.Buttons}`;
    return (
      <Aux>
        <h5>Performance</h5>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="perfname"
            label="Performance Name:"
            type="text"
            placeholder="Performance Name"
            component={this.renderField}
          />
          <Field
            name="perfdate"
            label="Date:"
            type="text"
            placeholder="mm/dd/yyyy"
            component={this.renderField}
          />
          <Field
            name="perftime"
            label="Time:"
            type="time"
            placeholder="6:00"
            component={this.renderField}
          />
          <Field
            name="menattire"
            label="Men's Attire:"
            type="text"
            placeholder="City"
            component={this.renderField}
          />
          <Field
            name="womenattire"
            label="Women's Attire:"
            type="text"
            placeholder="Women's Attire"
            component={this.renderField}
          />
          {/* <Field
            name="churchphone"
            label="Phone:"
            type="text"
            placeholder="Church"
            component={this.renderChurches}
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
  if (ownProps.performanceToHandle) {
    value = state.performanceList[ownProps.performanceToHandle];
  }
  return {
    initialValues: value
  };
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    // validate,
    form: "performanceForm",
    enableReinitialize: true
  })(PerformanceForm)
);
