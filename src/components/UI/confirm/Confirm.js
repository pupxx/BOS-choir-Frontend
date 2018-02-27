// This component can receive the following props:
// content - ""
// confirmButtonText - ""
// cancelButtonText - ""
// confirmAction - fn()
// cancelAction - fn()

import React, { Component } from "react";

import classes from "./confirm.css";

class Confirm extends Component {
  state = {};

  render() {
    let confirm = `ui mini green button ${classes.Buttons}`;
    let cancel = `ui mini red button ${classes.Buttons}`;
    return (
      <div className={classes.Main}>
        <div className={classes.Content}>{this.props.content}</div>
        <div className={classes.ButtonContainer}>
          <button
            className={confirm}
            onClick={() => this.props.confirmAction()}
          >
            {this.props.confirmButtonText}
          </button>
          <button className={cancel} onClick={() => this.props.cancelAction()}>
            {this.props.cancelButtonText}
          </button>
        </div>
      </div>
    );
  }
}

export default Confirm;
