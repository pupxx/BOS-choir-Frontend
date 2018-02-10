import axios from "axios";
import { FETCH_ADMIN_MEMBER_LIST } from "../types";
import { authError } from "../index";

const ROOT_URL = "http://localhost:4000";

export function fetchAdminMemberList() {
  const url = `${ROOT_URL}/admin/admin-member-list`;
  const token = localStorage.getItem("token");
  const headers = { authorization: token };
  return function(dispatch) {
    return axios
      .get(url, { headers })
      .then(response => {
        dispatch({ type: FETCH_ADMIN_MEMBER_LIST, payload: response.data });
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}