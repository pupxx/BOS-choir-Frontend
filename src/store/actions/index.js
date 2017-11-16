import axios from 'axios';

export const FETCH_PERFORMANCES = 'FETCH_PERFORMANCES';
export const FETCH_REHEARSALS = 'FETCH_REHEARSALS';

const ROOT_URL = 'http://localhost:4000'

export function fetchPerformances() {
    const url = `${ROOT_URL}/performances`
    const request = axios.get(url);
    return {
        type: FETCH_PERFORMANCES,
        payload: request
    }
}

export function fetchRehearsals() {
    const url = `${ROOT_URL}/rehearsals`;
    const request = axios.get(url);

    return {
        type: FETCH_REHEARSALS,
        payload: request
        
    }
}