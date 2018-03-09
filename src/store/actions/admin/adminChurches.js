import axios from "axios";
import { DELETE_CHURCH, ADD_CHURCH } from "../types";
import { authError } from "../index";

const ROOT_URL = "http://localhost:4000";

export function deleteChurch(id, cb) {
  const url = `${ROOT_URL}/admin/remove-ward/${id}`;
  const token = localStorage.getItem("token");
  const headers = { authorization: token };
  return function(dispatch) {
    return axios
      .delete(url, { headers })
      .then(response => {
        dispatch({
          type: DELETE_CHURCH,
          payload: [id]
        });
      })
      .then(() => {
        cb();
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}
export function addChurch(values, cb) {
  const url = `${ROOT_URL}/admin/add-ward-branch`;
  const token = localStorage.getItem("token");
  const headers = { authorization: token };
  return function(dispatch) {
    return axios
      .post(url, values, { headers })
      .then(response => {
        dispatch({
          type: ADD_CHURCH,
          payload: response.data[0]
        });
      })
      .then(() => {
        cb();
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}
