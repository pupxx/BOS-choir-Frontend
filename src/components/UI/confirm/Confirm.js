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
          <button className={confirm} onClick={() => this.props.confirm()}>
            Confirm
          </button>
          <button className={cancel} onClick={() => this.props.cancel()}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default Confirm;
