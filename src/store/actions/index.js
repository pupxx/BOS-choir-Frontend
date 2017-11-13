import axios from 'axios';

export const FETCH_PERFORMANCES = 'FETCH_PERFORMANCES'
const ROOT_URL = 'http://localhost:3000'

export function fetchPerformances() {
    const url = `${ROOT_URL}/performances`
    const request = axios.get(url)
    return {
        type: FETCH_PERFORMANCES,
        payload: request
    }
}