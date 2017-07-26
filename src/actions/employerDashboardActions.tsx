import axios from 'axios';
import {ROOT_URL} from './index';
import {fetchingJobs} from "./jobActions";
import {Employer} from "../types/index";
import {   setEmployerAndUser, siteFetch} from "./authActions";
import {setAuth} from "../utils/utils";

export const GET_THIS_EMPLOYER_JOBS_SUCCESS = "GET_THIS_EMPLOYER_JOBS_SUCCESS";
export const FETCHING_THIS_EMPLOYER_JOBS = "FETCHING_THIS_EMPLOYER_JOBS";
export const REGISTER_EMPLOYER_SUCCESS = "REGISTER_EMPLOYER_SUCCESS";
export const EDITING_JOB_POST = "EDITING_JOB_POST";
export const EDITING_JOB_POST_SUCCESS = "EDITING_JOB_POST_SUCCESS";

/*What are some of the actions you expect the dashboard to require?
 * Get all jobs
 * Get all applicants
 * view job details
 * edit job details
 * delete job
 * view applicants per job
 * view applicant details*/

export function fetchingThisEmployerInfo() {
    return {
        type: FETCHING_THIS_EMPLOYER_JOBS,
        payload: "fetching jobs"
    }
}

export function registerEmployerSuccess() {
    return {
        type: REGISTER_EMPLOYER_SUCCESS,
        payload: "employer registered"
    }
}

export function getThisEmployerJobsSuccess(jobs) {
    return {
        type: GET_THIS_EMPLOYER_JOBS_SUCCESS,
        payload: jobs
    }
}

export function editingJobPost() {
    return {
        type: EDITING_JOB_POST,
        payload: 'editing job post'
    }
}

export function editingJobPostSuccess(jobPost) {
    return {
        type: EDITING_JOB_POST_SUCCESS,
        payload: jobPost
    }
}

export function saveJobPost(jobPostInfo, userId) {
    return dispatch => {

        dispatch(editingJobPost());

        axios.post(`${ROOT_URL}user/dashboard/${userId}/createjob`, jobPostInfo)
            .then((response) => {
                dispatch(editingJobPostSuccess(response.data.jobPost));
            })
            .catch((error) => {
            //TODO need to add an error handlers
            });
    }

};

export function submitEmployerRegistration(employerInfo: Employer) {

    return dispatch => {
        dispatch(siteFetch());
        axios.post(`${ROOT_URL}employer/register`, employerInfo)
            .then((response) => {

                /*recieving {token, employer}*/
                setAuth(response.data.token);

                dispatch(setEmployerAndUser(response.data.employer, response.data.user));
            })
            .catch((error) => console.log(error))
    }
}
