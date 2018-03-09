import {
  FETCH_CHURCHS,
  DELETE_CHURCH,
  ADD_CHURCH,
  EDIT_CHURCH
} from "../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CHURCHS:
      return _.mapKeys(action.payload, "id");
    case DELETE_CHURCH:
      return _.omit(state, action.payload);
    case ADD_CHURCH:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CHURCH:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
