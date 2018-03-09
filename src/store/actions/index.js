import axios from "axios";
import { fetchProfile } from "./profile";
import {
  AUTH_USER,
  FETCH_REHEARSALS,
  FETCH_MEMBER_INFO,
  AUTH_ERROR,
  UNAUTH_USER,
  IS_ADMIN
} from "./types";
export * from "./performances";
export * from "./profile";
export * from "./churchs";
export * from "./admin/adminMembers";
export * from "./admin/adminPerformances";
export * from "./admin/adminChurches";

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

export function signinUser(
  { email, password },
  goToLanding,
  goToRegister,
  goToAdmin
) {
  return function(dispatch) {
    const url = `${ROOT_URL}/signin`;
    const getMemberInfo = `${ROOT_URL}/members/member-info`;
    let token;
    let headers;
    return axios
      .post(url, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        return response;
      })
      .then(() => {
        token = localStorage.getItem("token");
        headers = { authorization: token };
        return axios.get(getMemberInfo, { headers }).then(memberInfo => {
          dispatch({ type: FETCH_MEMBER_INFO, payload: memberInfo });

          return memberInfo;
        });
      })
      .then(memberInfo => {
        dispatch(fetchProfile());
        return memberInfo;
      })
      .then(memberInfo => {
        if (memberInfo.data[0].admin === true) {
          dispatch({ type: IS_ADMIN, payload: memberInfo.data[0] });
          goToAdmin();
        } else {
          if (memberInfo.data[0].firstname === "") {
            goToRegister();
          } else {
            goToLanding();
          }
        }
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

export function isAdmin(goToMemberLanding, goToAdminLocation) {
  const token = localStorage.getItem("token");
  const headers = { authorization: token };
  let url = `${ROOT_URL}/admin/isAdmin`;
  return function(dispatch) {
    return axios
      .get(url, { headers })
      .then(isadmin => {
        if (isadmin.data[0].admin === true) {
          dispatch({ type: IS_ADMIN, payload: isadmin.data[0] });
          goToAdminLocation();
        } else {
          goToMemberLanding();
        }
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}
