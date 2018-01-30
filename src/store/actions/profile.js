import axios from "axios";
import { FETCH_PROFILE, FETCH_MEMBER_INFO } from "./types";

const ROOT_URL = "http://localhost:4000";
const token = localStorage.getItem("token");

export function fetchProfile() {
  return function(dispatch) {
    const url = `${ROOT_URL}/members/profile`;
    let headers = { authorization: token };
    axios.get(url, { headers }).then(profile => {
      dispatch({
        type: FETCH_PROFILE,
        payload: profile.data
      });
    });
  };
}

export function fetchMemberInfo() {
  return function(dispatch) {
    const url = `${ROOT_URL}/members/member-info`;
    const headers = { authorization: token };
    axios.get(url, { headers }).then(memberOwnInfo => {
      dispatch({ type: FETCH_MEMBER_INFO, payload: memberOwnInfo });
    });
  };
}

export function updateMemberProfile(values, cb) {
  const headers = { authorization: token };

  return function(dispatch) {
    const url = `${ROOT_URL}/members/update-profile`;
    axios.patch(url, values, { headers }).then(memberid => {
      fetchProfile();
      cb();
    });
  };
}
