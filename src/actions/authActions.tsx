import axios from 'axios';
import {ADD_LOGIN_ERROR, CLEAR_ALL_ERRORS, REMOVE_LOGIN_ERROR, ROOT_URL, SITE_IDLE, SITE_IS_FETCHING} from './index';

import {setAuth, removeAuth} from '../utils/utils';
import {Employer, SiteError, SiteFetching, User} from "../types/index";
import {register} from "ts-node/dist";

export const REGISTER_USER = 'REGISTER_USER';
export const FETCHING_USER = 'FETCHING_USER';
export const FETCHING_THIS_USER_ERROR = 'FETCHING_THIS_USER_ERROR';

export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const SET_USER = 'SET_USER';
export const SET_EMPLOYER = 'SET_EMPLOYER';
export const LOG_OUT_EMPLOYER = 'LOG_OUT_EMPLOYER';

export const LOG_OUT_USER = 'LOG_OUT_USER';

//this get's called after the server registers a new user
export function registerUserSuccess(user) {

	/*accountType:"user"
	 email:"111"
	 employer:null
	 firstName: "Miguel"
	 userId	 :	 "5943152cdff9511e5c8cb226"
	 lastName:"Rico"
	* */
	return {
		type: REGISTER_USER_SUCCESS,
		payload: user
	}
}

export function registerUserError(error) {
	return {
		type: REGISTER_USER_ERROR,
		payload: {isFetching: false, error}
	}
}

export function setSiteIdle() {
	return {
		type: SITE_IDLE,
		payload: {isFetching: false}
	}
}

export function siteFetch() {
	console.log("siteFetch()");
	return {
		type: SITE_IS_FETCHING,
		payload: true,
	}
}


export function registerUser(userObject) {
	/*{
	 fName: '',
	 lName: '',
	 email: '',
	 emailVerify: '',
	 password: '',
	 passwordVerify: '',
	 accountType: 'user',
	 employer: null
	 },*/

	console.log("authActions:", userObject);

	return dispatch => {

		dispatch(siteFetch());

		axios.post(`${ROOT_URL}api/register`, userObject)
			.then((response) => {
				/*response: {user, token}*/

				localStorage.setItem('tkn', response.data.token);

				setAuth(response.data.token);

				dispatch(registerUserSuccess(response.data.user));
				dispatch(setSiteIdle());

			})
			.catch((error) => {
				dispatch(registerUserError(error));

			});
	}

};

// =============================
// CLEAR
// =============================
export function clearEmployer() {
	return {
		type: LOG_OUT_EMPLOYER,
		payload: "log out employer"
	}
}

export function clearUser() {
	return {
		type: LOG_OUT_USER,
		payload: "user being logged out..."
	}
}

export function logOutUser() {

	//clear the local storage
	localStorage.clear();
	removeAuth();

	return dispatch => {
		dispatch(clearEmployer());
		dispatch(clearUser());
	}
}

// =============================
// SETTING EMPLOYER
// =============================
export function setEmployer(employer: Employer) {
	return {
		type: SET_EMPLOYER,
		payload: employer
	}
}

// =============================
// SETTING USER
// =============================
export function setUser(user: User) {
	return (dispatch) => dispatch({
		type: SET_USER,
		payload: user
	});
}

// =============================
// LOGIN
// =============================

export function logInUserError(error) {
	console.log("logInUserError", error);
		return {
			type: ADD_LOGIN_ERROR,
			payload: {typeOfError: "user", message:error}
		}
}

export function removeLogInError(){
	return{
		type: REMOVE_LOGIN_ERROR,
		payload: 'removing error'
	}
}

export function clearAllErrors(){
	console.log("clearing all errors!");
	return{
		type: CLEAR_ALL_ERRORS
	}
}

//requires a user and token property
export function logInUserSuccess(data) {
	return {
		type: LOGIN_USER_SUCCESS,
		payload: data
	}

}

//gets the token passed from localStorage
export function logInOnLoad(token) {
	return dispatch => {

		dispatch(siteFetch());
		axios.post(`${ROOT_URL}api/login/logcheck`, {token})
			.then((response) => {

				//response contains uer, which is our decoded token
				console.log("the response from logInOnLoad:", response);
				//set token as part of our request headers
				setAuth(token);

				if (response.data.user.employerId !== null) {
					dispatch(setEmployerAndUser(response.data.employer, response.data.user));
				} else {
					dispatch(logInUserSuccess(response.data.user));
					dispatch(setSiteIdle());
				}

			})
			.catch((error) => {
			console.log("so do we have some error", error);
				// dispatch(logInUserError(error.response.status));
				dispatch(clearAllErrors());
				dispatch(setSiteIdle());
			})
	}
}

//this will dispatch the users email and password to server for verification
export function logInUser(user) {
	console.log("calling logInUser...");
	/*user = {
		email
		password
	};*/
	return dispatch => {

		dispatch(siteFetch());

		axios.post(`${ROOT_URL}api/login`, user)
			.then((response) => {
				//save token to local storage
				const token = response.data.token;
				localStorage.setItem('tkn', token);

				console.log("The response that we get when we log in:", response);
				//set the token as part of our request header
				setAuth(token);

				if (response.data.user.employerId !== null) {
					dispatch(setEmployerAndUser(response.data.employer, response.data.user));
				} else {
					dispatch(logInUserSuccess(response.data.user));
					dispatch(setSiteIdle());
				}

			})
			.catch((error) => {
				dispatch(setSiteIdle());
				console.log("the error returned when logging in:", error.response);
				dispatch(logInUserError(error.response.data.errorMessage));

			})
	}
}

export function setEmployerAndUser(employer, user) {
	return dispatch => {
		dispatch(removeLogInError());
		dispatch(setEmployer(employer));
		dispatch(logInUserSuccess(user));
		dispatch(setSiteIdle());
	}
}