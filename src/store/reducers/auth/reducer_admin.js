import { IS_ADMIN } from "../../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case IS_ADMIN:
      return action.payload;

    default:
      return state;
  }
}
