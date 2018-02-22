import {
  FETCH_ADMIN_MEMBER_LIST,
  FETCH_ADMIN_SINGLE_MEMBER
} from "../../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ADMIN_MEMBER_LIST:
      return _.mapKeys(action.payload, "memberID");
    case FETCH_ADMIN_SINGLE_MEMBER:
      return { ...state, [action.payload.data.memberID]: action.payload.data };
    default:
      return state;
  }
}
