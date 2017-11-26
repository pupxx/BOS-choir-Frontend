import { combineReducers } from "redux";
import performanceList from "./reducer_performance_list";
import quote from "./reducer_quote";
import rehearsals from "./reducer_rehearsals";
import { reducer as form } from "redux-form";

const rootReducer = combineReducers({
  performanceList,
  quote,
  rehearsals,
  form
});

export default rootReducer;
