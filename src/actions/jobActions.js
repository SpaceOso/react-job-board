import axios from 'axios';

import {ROOT_URL} from './index';

export const GET_JOBS = 'GET_JOBS';
export const FIND_JOB_BY_ID = 'FIND_JOB_BY_ID';

export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export function getJobsSuccess(jobs) {
    console.log('inside get jobs success with:', jobs);
    return {
        type: GET_JOBS_SUCCESS,
        payload: jobs
    }
}

export const GET_JOBS_ERROR = 'GET_JOBS_ERROR';
export function getJobsError(error){
    return{error, type: GET_JOBS_ERROR}
}


export function getJobs() {
    console.log("dang it");

     return dispatch => {axios.get(`${ROOT_URL}${'jobposts'}`)
        .then((response) => {
            console.log(response);
            dispatch(getJobsSuccess(response))
        })
        .catch((error) => {
            console.log(error);
        });}
}

export function getJobById(id) {
    console.log("in the action for getting a job by id");
    const request = axios.get(`${ROOT_URL}${'jobposts/'}${id}`);

    return {
        type: FIND_JOB_BY_ID,
        payload: request
    }
}