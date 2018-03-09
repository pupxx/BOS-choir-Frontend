// This modal renders nothing but on componentDidMount, it creates a div and
// Appends that div to the body.  This div is the transparent black background.
// It then renders another div that can contain children and also be sized with small to
// make it smaller.  These children are what lies within <Modal></Modal> when it is used
// in another component.

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "../../../index";

import classes from "./modal.css";

class Modal extends Component {
  componentDidMount() {
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
    let classname;
    if (this.props.size === "small") {
      classname = classes.SmallModal;
    } else {
      classname = classes.ModalRegular;
    }
    ReactDOM.render(
      <Provider store={store}>
        <div className={classname}>{this.props.children}</div>
      </Provider>,
      this.modalTarget
    );
  }
  render() {
    return <noscript />;
  }
}

export default Modal;
