import axios from 'axios';

const ROOT_URL = 'http://localhost:4200/';

export const GET_JOBS = 'GET_JOBS';
export const FIND_JOB_BY_ID = 'FIND_JOB_BY_ID';


export function getJobs(){
	console.log("inside the job action creator");
	
	const request = axios.get(`${ROOT_URL}${'jobposts'}`);
	
	console.log(request);
	return {
		type: GET_JOBS,
		payload: request
	}
}

export function getJobById(id){
	console.log("in the action for getting a job by id");
	const request = axios.get(`${ROOT_URL}${'jobposts/'}${id}`);
	console.log(request);

	return {
		type: FIND_JOB_BY_ID,
		payload: request
	}
}