import axios from "axios";
import { FETCH_CHURCHS } from "./types";
import { authError } from "./index";

const ROOT_URL = "http://localhost:4000";

export function fetchChurchs() {
  return function(dispatch) {
    const url = `${ROOT_URL}/churchs`;
    const token = localStorage.getItem("token");
    const headers = { authorization: token };
    return axios
      .get(url, { headers })
      .then(churchs => {
        dispatch({ type: FETCH_CHURCHS, payload: churchs.data });
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}
