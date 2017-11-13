import { combineReducers } from 'redux';
import performanceListReducer from './reducer_performance_list'

const rootReducer = combineReducers({
    performanceList: performanceListReducer
});

export default rootReducer;