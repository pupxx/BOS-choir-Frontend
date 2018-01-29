import { FETCH_MEMBER_INFO } from "../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MEMBER_INFO:
      return _.mapKeys(action.payload.data, "memberID");
    default:
      return state;
  }
}
