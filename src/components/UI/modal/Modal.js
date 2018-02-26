import React, { Component } from "react";
import ReactDOM from "react-dom";

import classes from "./modal.css";

class Modal extends Component {
  componentDidMount() {
    console.log(this.props);
    this.modalTarget = document.createElement("div");
    this.modalTarget.className = classes.Modal;
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    ReactDOM.render(
      <div className={classes.ModalChild}>{this.props.children}</div>,
      this.modalTarget
    );
  }
  render() {
    return <noscript />;
  }
}

export default Modal;
