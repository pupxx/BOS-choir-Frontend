import {
  FETCH_PERFORMANCES,
  FETCH_ADMIN_PERFORMANCE_LIST
} from "../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PERFORMANCES:
      return _.mapKeys(action.payload, "id");
    case FETCH_ADMIN_PERFORMANCE_LIST:
      return _.mapKeys(action.payload, "performanceID");
    default:
      return state;
  }
}
