import axios from 'axios';
import {EMPLOYER_FETCHING, EMPLOYER_IDLE, ROOT_URL} from './index';
import {fetchingJobs} from "./jobActions";
import {Employer} from "../types/index";
import {setEmployerAndUser, setSiteIdle, siteFetch} from "./authActions";
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

export function fetchAllEmployerJobModels(employerId) {
	return dispatch => {
		dispatch(employerFetching());

		axios.get(`${ROOT_URL}employer/dashboard/${employerId}/getAllJobs`)
			.then()
	}
}

export function editingJobPostSuccess(jobPost) {
	return {
		type: EDITING_JOB_POST_SUCCESS,
		payload: jobPost
	}
}

export function employerFetching() {
	return {
		type: EMPLOYER_FETCHING,
		payload: "Employer Fetching"
	}
}

export function employerIdle() {
	return {
		type: EMPLOYER_IDLE,
		payload: "Employer Idle"
	}
}

/**
 *
 * @param {Object}jobPostInfo - It's the form values from createJobComponent. It's set in the state.
 * @param userId{string}
 * @return {(dispatch) => any}
 */
export function saveJobPost(jobPostInfo, userId) {
	return dispatch => {

		dispatch(employerFetching());

		axios.post(`${ROOT_URL}user/dashboard/${userId}/createjob`, jobPostInfo)
			.then((response) => {
				dispatch(editingJobPostSuccess(response.data.jobPost));
				dispatch(employerIdle());
			})
			.catch((error) => {
				//TODO need to add an error handlers
				dispatch(setSiteIdle());
			});
	}

}

/**
 *
 * @param employerInfo {object}                   - The employer information created after registration of a new user
 * @param file {File | null}   - The employer logo
 * @property employerInfo.userId {string}         - The current user id who is trying to register a new employer
 * @return {(dispatch) => any}
 */
export function submitEmployerRegistration(employerInfo, file: File) {

	let data = new FormData();
	if (file !== null) {
		data.append('file', file);
	}

	for (let entries in employerInfo) {
		if (employerInfo.hasOwnProperty(entries)) {

			if (entries === 'logoImg') {
				data.append(entries, '');
			} else {
				data.append(entries, employerInfo[entries]);
			}

		}
	}

	return dispatch => {

		dispatch(siteFetch());

		axios.post(`${ROOT_URL}employer/register`, data)
			.then((response) => {

				/*recieving {token, employer}*/
				setAuth(response.data.token);

				dispatch(setEmployerAndUser(response.data.employer, response.data.user));
			})
			.catch((error) => console.log(error))
	}
}
