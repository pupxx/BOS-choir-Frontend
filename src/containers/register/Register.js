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
        <select {...field.input} type="select" className="form-control" placeholder={field.placeholder}>
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
    console.log(this.props.initialValues);

    let parts = ["Soprano", "Alto", "Tenor", "Bass"];
    let location = ["Barrie Ward", "Orilla", "Brampton"];
    const { handleSubmit } = this.props;
    return <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className={classes.Form}>
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
        name="email" 
        label="Email:" 
        type="email" 
        component={this.renderField} 
        placeholder="Email" 
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
        placeholder="Part" />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>;
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
