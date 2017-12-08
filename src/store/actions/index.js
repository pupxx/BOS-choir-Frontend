import axios from "axios";
import { AUTH_USER, FETCH_REHEARSALS, AUTH_ERROR, UNAUTH_USER } from "./types";
export * from "./performances";

const ROOT_URL = "http://localhost:4000";

export function fetchRehearsals() {
  return function(dispatch) {
    const url = `${ROOT_URL}/rehearsals`;
    axios.get(url).then(rehearsals => {
      dispatch({ type: FETCH_REHEARSALS, payload: rehearsals.data });
    });
  };
}

export function signupUser({ email, password }, cb) {
  return function(dispatch) {
    const url = `${ROOT_URL}/signup`;
    axios
      .post(url, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        return response;
      })
      .then(response => {
        cb();
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function signinUser({ email, password }, cb) {
  return function(dispatch) {
    const url = `${ROOT_URL}/signin`;
    axios
      .post(url, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        return response;
      })
      .then(() => {
        cb();
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function signOutUser() {
  localStorage.removeItem("token");
  return { type: UNAUTH_USER };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
