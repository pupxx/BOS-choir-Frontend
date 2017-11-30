import { FETCH_REHEARSALS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_REHEARSALS:
      console.log(action.payload.data);
      return action.payload;
    default:
      return state;
  }
};
