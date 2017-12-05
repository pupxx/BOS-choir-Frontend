import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { AUTH_USER } from "./store/actions/types";

import "./index.css";
import App from "./components/app/App";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./store/reducers";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");

if (token) {
  store.dispatch({ type: AUTH_USER });
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={App} />
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.querySelector("#root"));
registerServiceWorker();
