import { combineReducers } from 'redux';
import performanceListReducer from './reducer_performance_list';
import quote from './reducer_quote'

const rootReducer = combineReducers({
    performanceList: performanceListReducer, 
    quote: quote
});

export default rootReducer;