import axios from "axios";
import {
  FETCH_ADMIN_MEMBER_LIST,
  FETCH_ADMIN_SINGLE_MEMBER,
  DELETE_MEMBER
} from "../types";
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

export function fetchSingleMember(id, cb) {
  const url = `${ROOT_URL}/admin/single-member/${id}`;
  const token = localStorage.getItem("token");
  const headers = { authorization: token };
  return function(dispatch) {
    return axios
      .get(url, { headers })
      .then(singleMember => {
        dispatch({ type: FETCH_ADMIN_SINGLE_MEMBER, payload: singleMember });
      })
      .then(() => {
        if (cb) {
          cb();
        }
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function updateMemberInfo(values, cb) {
  const token = localStorage.getItem("token");
  const headers = { authorization: token };

  return function(dispatch) {
    const url = `${ROOT_URL}/admin/update-single-member/${values.memberID}`;
    axios
      .patch(url, values, { headers })
      .then(memberid => {
        dispatch(fetchSingleMember(memberid.data[0], cb));
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function deleteMember(memberID, cb) {
  const token = localStorage.getItem("token");
  const headers = { authorization: token };

  return function(dispatch) {
    const url = `${ROOT_URL}/admin/remove-member/${memberID}`;
    axios
      .delete(url, { headers })
      .then(() => {
        dispatch({ type: DELETE_MEMBER, payload: [memberID] });
      })
      .then(() => {
        cb();
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}
