import { FETCH_PROFILE } from "../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return _.mapKeys(action.payload, "memberID");
    default:
      return state;
  }
}
