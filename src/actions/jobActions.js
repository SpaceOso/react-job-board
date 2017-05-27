import axios from 'axios';

const ROOT_URL = 'http://localhost:4200/';

export const GET_JOBS = 'GET_JOBS';

export function getJobs(){
	console.log("inside the job action creator");
	
	const request = axios.get(`${ROOT_URL}${'jobposts'}`);
	
	console.log(request);
	return {
		type: GET_JOBS,
		payload: request
	}
}