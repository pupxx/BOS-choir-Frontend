import { IS_ADMIN } from "../../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case IS_ADMIN:
      return action.payload;

    default:
      return state;
  }
}
