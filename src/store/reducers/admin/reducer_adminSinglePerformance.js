import { FETCH_SINGLE_PERFORMANCE } from "../../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SINGLE_PERFORMANCE:
      console.log(action.payload);
      console.log("!!!!!!!!!!", _.mapKeys(action.payload));
      return _.mapKeys(action.payload, "performanceID");
    default:
      return state;
  }
}
