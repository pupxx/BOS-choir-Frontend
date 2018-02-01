import axios from "axios";
import { FETCH_PROFILE, FETCH_MEMBER_INFO, AUTH_ERROR } from "./types";
import { authError } from "./index";

const ROOT_URL = "http://localhost:4000";

export function fetchProfile() {
  const token = localStorage.getItem("token");
  return function(dispatch) {
    const url = `${ROOT_URL}/members/profile`;
    let headers = { authorization: token };
    return axios
      .get(url, { headers })
      .then(profile => {
        dispatch({
          type: FETCH_PROFILE,
          payload: profile.data
        });
        return profile;
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function fetchMemberInfo() {
  const token = localStorage.getItem("token");

  return function(dispatch) {
    const url = `${ROOT_URL}/members/member-info`;
    const headers = { authorization: token };
    axios
      .get(url, { headers })
      .then(memberOwnInfo => {
        dispatch({ type: FETCH_MEMBER_INFO, payload: memberOwnInfo });
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function updateMemberProfile(values, cb) {
  const token = localStorage.getItem("token");
  const headers = { authorization: token };

  return function(dispatch) {
    const url = `${ROOT_URL}/members/update-profile`;
    axios
      .patch(url, values, { headers })
      .then(memberid => {
        fetchProfile();
        cb();
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}
