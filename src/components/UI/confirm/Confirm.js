import React, { Component } from "react";

import classes from "./confirm.css";

class Confirm extends Component {
  state = {};

  deleteMember(memberToDelete) {
    console.log(memberToDelete, "this is the member to delete");
  }

  render() {
    return (
      <div className={classes.Main}>
        {this.props.content}
        <hr />
        <div className={classes.Right}>
          <button
            className="ui mini green button"
            onClick={() => this.deleteMember(this.props.memberToDelete)}
          >
            Confirm
          </button>
          <button
            className="ui mini red button"
            onClick={() => this.props.renderModal()}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default Confirm;
