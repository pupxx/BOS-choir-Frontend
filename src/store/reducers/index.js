import { combineReducers } from 'redux';
import performanceListReducer from './reducer_performance_list';
import quote from './reducer_quote';
import rehearsals from './reducer_rehearsals';

const rootReducer = combineReducers({
    performanceList: performanceListReducer, 
    quote: quote, 
    rehearsals: rehearsals
});

export default rootReducer;