import axios from 'axios';
import {ROOT_URL} from './index';
import jwt from 'jsonwebtoken';

import setAuth from '../utils/utils';

export const GET_ALL_JOBS = "GET_ALL_JOBS";
export const GET_JOB_BY_ID = "GET_JOB_BY_ID";
export const GET_THIS_EMPLOYER_JOBS_SUCCESS = "GET_THIS_EMPLOYER_JOBS_SUCCESS";
export const FETCHING_THIS_EMPLOYER_JOBS = "FETCHING_THIS_EMPLOYER_JOBS";

/*What are some of the actions you expect the dashboard to require?
 * Get all jobs
 * Get all applicants
 * view job details
 * edit job details
 * delete job
 * view applicants per job
 * view applicant details*/

export function fetchingThisEmployerJobs() {
    return {
        type: FETCHING_THIS_EMPLOYER_JOBS,
        payload: "fetching jobs"
    }
}

export function getThisEmployerJobsSuccess(jobs) {
    return {
        type: GET_THIS_EMPLOYER_JOBS_SUCCESS,
        payload: jobs
    }
}

export function submitEmployerRegistration(employerInfo){
    console.log("will be making a post request with the following info.", employerInfo);
}

//This will be called when the user logs in and goes into the dashboard IF the account is an employer account
export function getThisEmployerInfo(userId, employerId) {

    return dispatch => {
        dispatch(fetchingJobs);
        axios.get(`${ROOT_URL}employer/dashboard/${employerId}/employerhome`)
            .then((response) => {
                dispatch(getThisEmployerJobsSuccess(response));
            })
            .catch((error) => {
            })

    }

}