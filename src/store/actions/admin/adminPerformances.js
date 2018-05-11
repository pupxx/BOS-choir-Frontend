import axios from "axios";
import {
  FETCH_ADMIN_PERFORMANCE_LIST,
  FETCH_SINGLE_PERFORMANCE
} from "../types";
import { authError } from "../../actions/index";

const ROOT_URL = "http://localhost:4000";

export function fetchAdminPerformanceList() {
  return function(dispatch) {
    let url = `${ROOT_URL}/admin/performances`;
    let token = localStorage.getItem("token");
    let headers = { authorization: token };
    axios
      .get(url, { headers })
      .then(performances => {
        dispatch({
          type: FETCH_ADMIN_PERFORMANCE_LIST,
          payload: performances.data
        });
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function fetchSinglePerformance(id, cb) {
  return function(dispatch) {
    let url = `${ROOT_URL}/admin/performance/${id}`;
    let token = localStorage.getItem("token");
    let headers = { authorization: token };
    axios
      .get(url, { headers })
      .then(performance => {
        dispatch({
          type: FETCH_SINGLE_PERFORMANCE,
          payload: performance.data
        });
      })
      .then(() => {
        cb();
      })
      .catch(err => {
        console.log(err);
        dispatch(authError(err.response.data.message));
      });
  };
}

export function editSinglePerformance(values, cb) {
  return function(dispatch) {
    console.log("!!!!!!!!!!!!!!!!");
    let url = `${ROOT_URL}/admin/update-performance/${values.id}`;
    let token = localStorage.getItem("token");
    let headers = { authorization: token };
    axios
      .patch(url, values, { headers })
      .then(response => {
        console.log(response);
        // dispatch({ type: EDIT_PERFORMANCE, payload: response });
      })
      .then(() => {
        cb();
      })
      .catch(err => {
        console.log(err);
        dispatch(authError(err.response.data.message));
      });
  };
}
