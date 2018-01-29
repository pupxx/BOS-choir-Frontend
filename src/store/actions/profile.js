import axios from "axios";
import { FETCH_PROFILE, FETCH_MEMBER_INFO } from "./types";

const ROOT_URL = "http://localhost:4000";

export function fetchProfile() {
  return function(dispatch) {
    const url = `${ROOT_URL}/members/profile`;
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
    const headers = { authorization: token };
    axios.get(url, { headers }).then(memberOwnInfo => {
      dispatch({ type: FETCH_MEMBER_INFO, payload: memberOwnInfo });
    });
  };
}
