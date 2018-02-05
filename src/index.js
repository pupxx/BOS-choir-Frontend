import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { AUTH_USER } from "./store/actions/types";

import "./index.css";
import App from "./components/app/App";
import requireAdmin from "./hoc/authorize/Authorize";
import requireAuth from "./hoc/auth/require_authentication";
import AdminLanding from "../src/containers/admin/adminLanding/AdminLanding";
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
        <Switch>
          {/* <Route
            path="/admin/admin-landing"
            component={requireAuth(requireAdmin(AdminLanding))}
          /> */}
          <Route path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.querySelector("#root"));
registerServiceWorker();
