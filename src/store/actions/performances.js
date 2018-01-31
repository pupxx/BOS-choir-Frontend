import axios from "axios";
import { FETCH_PERFORMANCES } from "./types";
import { authError } from "./index";

const ROOT_URL = "http://localhost:4000";

export function fetchPerformances() {
  return function(dispatch) {
    let url;
    let token = localStorage.getItem("token");
    let headers = { authorization: token };
    if (!token) {
      url = `${ROOT_URL}/performances`;
    } else {
      url = `${ROOT_URL}/performances/member/landing`;
    }
    axios
      .get(url, { headers })
      .then(performances => {
        dispatch({ type: FETCH_PERFORMANCES, payload: performances.data });
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function addAttendance(id) {
  return function(dispatch) {
    let url = `${ROOT_URL}/performances/attendance/${id}`;
    let perfurl = `${ROOT_URL}/performances/member/landing`;
    let token = localStorage.getItem("token");
    let headers = { authorization: token };
    axios
      .post(url, { id }, { headers })
      .then(response => {
        if (response.data[0].id) {
          axios.get(perfurl, { headers }).then(performances => {
            dispatch({
              type: FETCH_PERFORMANCES,
              payload: performances.data
            });
          });
        }
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function removeAttendance(id) {
  return function(dispatch) {
    let url = `${ROOT_URL}/performances/attendance/not-attending/${id}`;
    let perfurl = `${ROOT_URL}/performances/member/landing`;
    let token = localStorage.getItem("token");
    let headers = { authorization: token };
    axios
      .delete(url, { headers })
      .then(response => {
        if (response.data[0].id) {
          axios.get(perfurl, { headers }).then(performances => {
            dispatch({
              type: FETCH_PERFORMANCES,
              payload: performances.data
            });
          });
        }
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}
