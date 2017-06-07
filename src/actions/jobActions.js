import axios from 'axios';

import {ROOT_URL} from './index';

export const FIND_JOB_BY_ID = 'FIND_JOB_BY_ID';
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export const GET_JOBS_ERROR = 'GET_JOBS_ERROR';
export const FETCHING_JOBS = 'FETCHING_JOBS';

export function getJobsSuccess(jobs) {
    console.log('inside get jobs success with:', jobs);
    return {
        type: GET_JOBS_SUCCESS,
        payload: jobs
    }
}

export function getJobsError(error){
    return{error, type: GET_JOBS_ERROR}
}

export function fetchingJobs() {
    return{
        type: FETCHING_JOBS,
        payload: 'nothing here'
    }
}

export function getJobs() {
    console.log("dang it");

     return dispatch => {

        dispatch(fetchingJobs());
         axios.get(`${ROOT_URL}${'jobposts'}`)
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