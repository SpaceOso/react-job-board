import axios from 'axios';

import {ROOT_URL} from './index';

export const FIND_JOB_BY_ID = 'FIND_JOB_BY_ID';
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export const GET_JOBS_ERROR = 'GET_JOBS_ERROR';
export const FETCHING_JOBS = 'FETCHING_JOBS';
export const RESET_CURRENT_JOB = 'RESET_CURRENT_JOB';
export const SINGLE_JOB_SUCCESS = 'SINGLE_JOB_SUCCESS';

export function getJobsSuccess(jobs) {
	return {
		type: GET_JOBS_SUCCESS,
		payload: jobs
	}
}

export function getJobsError(error) {
	return {error, type: GET_JOBS_ERROR}
}

export function fetchingJobs() {
	return {
		type: FETCHING_JOBS,
		payload: 'nothing here'
	}
}

export function getJobs() {
	
	return dispatch => {
		
		dispatch(fetchingJobs());
		axios.get(`${ROOT_URL}${'jobposts'}`)
			.then((response) => {
				dispatch(getJobsSuccess(response))
			})
			.catch((error) => {
			});
	}
}

export function resetCurrentJob() {
	return {
		type: RESET_CURRENT_JOB,
		payload: {}
	}
}

export function singleJobSuccess(job) {
	return {
		type: SINGLE_JOB_SUCCESS,
		payload: job
	}
}

export function getJobById(id) {
	return dispatch => {
		dispatch(fetchingJobs());
		axios.get(`${ROOT_URL}${'jobposts/'}${id}`)
			.then((response) => {
				dispatch(singleJobSuccess(response));
			})
			.catch((error) => {
			})
	};
}