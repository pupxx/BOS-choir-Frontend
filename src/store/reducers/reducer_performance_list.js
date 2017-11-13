
import { FETCH_PERFORMANCES } from '../actions/index';

export default function (state = [1,2,3], action) {
    switch (action.type) {
        case FETCH_PERFORMANCES:
            return action.payload.data
        default:
            return state
    }
}