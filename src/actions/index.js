import axios from 'axios';

const ROOT_URL = 'http://localhost:4200/';

export const GET_JOBS = 'GET_JOBS';

export function getJobs(){
	
	const request = axios.get(`${ROOT_URL}${'jobposts'}`);

	return {
		type: GET_JOBS,
		payload: request
	}
}