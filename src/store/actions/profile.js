import axios from "axios";
import { FETCH_PROFILE } from "./types";

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
