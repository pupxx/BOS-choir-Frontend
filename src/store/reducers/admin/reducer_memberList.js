import { FETCH_ADMIN_MEMBER_LIST } from "../../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ADMIN_MEMBER_LIST:
      return _.mapKeys(action.payload, "memberID");
    default:
      return state;
  }
}
