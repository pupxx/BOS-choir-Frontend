import { FETCH_PERFORMANCES } from "../actions/types";

export default function(state = [1, 2, 3], action) {
  switch (action.type) {
    case FETCH_PERFORMANCES:
      return action.payload;
    default:
      return state;
  }
}
