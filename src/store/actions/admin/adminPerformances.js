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

export function fetchSinglePerformance(id) {
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
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}
