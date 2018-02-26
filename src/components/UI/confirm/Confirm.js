import React, { Component } from "react";

class Confirm extends Component {
  state = {};

  deleteMember(id) {
    console.log(id, "this is the member to delete");
  }

  render() {
    return (
      <div>
        <button
          className="ui mini green button"
          onClick={() => this.deleteMember(this.props.memberToDelete)}
        >
          Yes
        </button>
        <button
          className="ui mini red button"
          onClick={() => this.props.renderModal()}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default Confirm;
