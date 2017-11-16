import { FETCH_REHEARSALS } from '../actions/index';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_REHEARSALS:
        console.log(action.payload.data);
            return action.payload.data;
        default:
            return state;
    }
};