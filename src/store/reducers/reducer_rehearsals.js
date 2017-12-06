import { FETCH_REHEARSALS } from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_REHEARSALS:
      console.log(action.payload);
      return _.mapKeys(action.payload, "rehearsalID");
    default:
      return state;
  }
};
