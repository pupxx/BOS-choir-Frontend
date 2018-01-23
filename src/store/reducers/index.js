import { combineReducers } from "redux";
import performanceList from "./reducer_performance_list";
import quote from "./reducer_quote";
import rehearsals from "./reducer_rehearsals";
import { reducer as form } from "redux-form";
import authReducer from "./auth/auth_reducer";
import profile from "./reducer_profile";

const rootReducer = combineReducers({
  performanceList,
  quote,
  rehearsals,
  form,
  auth: authReducer,
  profile
});

export default rootReducer;
