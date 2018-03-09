import { FETCH_CHURCHS, DELETE_CHURCH } from "../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CHURCHS:
      return _.mapKeys(action.payload, "id");
    case DELETE_CHURCH:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
