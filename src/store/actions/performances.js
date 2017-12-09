import axios from "axios";
import { FETCH_PERFORMANCES } from "./types";

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
    axios.get(url, { headers }).then(performances => {
      dispatch({ type: FETCH_PERFORMANCES, payload: performances.data });
    });
  };
}