import axios from 'axios';

import {ROOT_URL} from './index';

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

	return {
		type: FIND_JOB_BY_ID,
		payload: request
	}
}