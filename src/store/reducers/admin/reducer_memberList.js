import {
  FETCH_ADMIN_MEMBER_LIST,
  FETCH_ADMIN_SINGLE_MEMBER,
  DELETE_MEMBER
} from "../../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ADMIN_MEMBER_LIST:
      return _.mapKeys(action.payload, "memberID");
    case FETCH_ADMIN_SINGLE_MEMBER:
      return { ...state, [action.payload.data.memberID]: action.payload.data };
    case DELETE_MEMBER:
      console.log(action.payload, "here is the payload");
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
