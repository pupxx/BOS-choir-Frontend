import { combineReducers } from "redux";
import performanceList from "./reducer_performance_list";
import quote from "./reducer_quote";
import rehearsals from "./reducer_rehearsals";
import { reducer as form } from "redux-form";
import authReducer from "./auth/auth_reducer";
import profile from "./reducer_profile";
import churchs from "./reducers_churchs";
import memberInfo from "./reducer_memberInfo";

const rootReducer = combineReducers({
  performanceList,
  quote,
  rehearsals,
  form,
  auth: authReducer,
  profile,
  churchs,
  memberInfo
});

export default rootReducer;
