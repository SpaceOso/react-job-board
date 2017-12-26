import axios from 'axios';

import { Job } from '../types';
import { ROOT_URL } from './index';

export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export const GET_JOBS_ERROR = 'GET_JOBS_ERROR';
export const FETCHING_JOBS = 'FETCHING_JOBS';
export const DONE_FETCHING = 'DONE_FETCHING';
export const FETCHING_SINGLE_JOB = 'FETCHING_SINGLE_JOB';
export const ADDING_APPLICANT_TO_JOB = 'ADDING_APPLICANT_TO_JOB';
export const RESET_CURRENT_JOB = 'RESET_CURRENT_JOB';
export const SINGLE_JOB_SUCCESS = 'SINGLE_JOB_SUCCESS';

/*These are actions for the main page and job post page. Actions requiring CRUD job operations will be handled in the
* employerDashboardAction file.*/

export function getJobsSuccess(jobs) {
  return {
    type: GET_JOBS_SUCCESS,
    payload: jobs,
  };
}

export function getJobsError(error) {
  return { error, type: GET_JOBS_ERROR };
}

export function fetchingJobs() {
  return {
    type: FETCHING_JOBS,
    payload: 'nothing here',
  };
}

export function doneFetchingJobs() {
  return {
    type: DONE_FETCHING,
    payload: 'done fetching jobs',
  };
}

export function getJobs() {

  return (dispatch) => {

    dispatch(fetchingJobs());

    axios.get(`${ROOT_URL}api/jobposts`)
      .then((response) => {
        console.log('the response for jobs:', response);
        dispatch(getJobsSuccess(response));
      })
      .catch((error) => {
      });
  };
}

export function resetCurrentJob() {
  return {
    type: RESET_CURRENT_JOB,
    payload: {},
  };
}

export function singleJobSuccess(data: Job) {
  console.log('data:', data);
  return {
    type: SINGLE_JOB_SUCCESS,
    payload: data,
  };
}

export function fetchSingleJob() {
  return {
    type: FETCHING_SINGLE_JOB,
    payload: 'fetching single job',
  };
}

export function addingApplicantToJob(data) {
  return {
    type: ADDING_APPLICANT_TO_JOB,
    payload: data,
  };
}

export function addApplicantToJob(applicantInfo) {

  const data = new FormData();

  for (const entries in applicantInfo) {
    if (applicantInfo.hasOwnProperty(entries)) {
      data.set(entries, applicantInfo[ entries ]);
    }
  }

  return (dispatch) => {
    dispatch(fetchingJobs());
    console.log('in the job actions creating applicant with:', data);
    axios.post(`${ROOT_URL}api/createapplicant`, data)
      .then((response) => {
        console.log('The response that we get after we create an applicant...', response);
        dispatch(doneFetchingJobs());
      })
      .catch((error) => {
        console.log('error from creating applicant...', error);
      });
  };
}

export function getJobById(id) {
  return (dispatch) => {
    dispatch(fetchSingleJob());
    axios.get(`${ROOT_URL}${'api/jobposts/'}${id}`)
      .then((response) => {
        console.log('the response from searching by id:', response.data.job);
        dispatch(singleJobSuccess(response.data.job));
      })
      .catch((error) => {
      });
  };
};