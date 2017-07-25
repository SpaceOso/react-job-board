import axios from 'axios';
import {ROOT_URL, SITE_IDLE, SITE_IS_FETCHING} from './index';
import jwt from 'jsonwebtoken';

import {setAuth, removeAuth} from '../utils/utils';
import {Employer, User} from "../types/index";

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

export function fetchingUser() {
	return {
		type: FETCHING_USER,
		payload: {isFetching: true}
	}
}

export function setSiteIdle(){
	console.log("setSiteIdle()");
	return{
		type: SITE_IDLE,
		payload: {isFetching: false}
	}
}

export function siteFetch(){
	return{
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
	
	return dispatch => {
		
		dispatch(siteFetch());
		
		axios.post(`${ROOT_URL}register`, userObject)
			.then((response) => {
				/*response: {user, token}*/

				console.log("we are registering the user! Response:", response);
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
export function clearEmployer(){
	return{
		type: LOG_OUT_EMPLOYER,
		payload: "log out employer"
	}
}

export function clearUser(){
	return{
		type: LOG_OUT_USER,
		payload: "user being logged out..."
	}
}

export function logOutUser(){
	
	//clear the local storage
	localStorage.clear();
	removeAuth();

	return dispatch =>{
		dispatch(clearEmployer());
		dispatch(clearUser());
	}
}

// =============================
// SETTING EMPLOYER
// =============================
export function setEmployer(employer: Employer){
	console.log("SET_EMPLOYER:", employer);
	return{
		type: SET_EMPLOYER,
		payload: employer
	}
}

// =============================
// SETTING USER
// =============================
export function setUser(user: User){
	return {
		type: SET_USER,
		payload: user
	}
}

// =============================
// FETCHING ERROR
// =============================
//this will handle the case when the user goes to a dashboard link without being logged in first
export function fetchingThisUserError(payloadData){
	return{
		type: FETCHING_THIS_USER_ERROR,
		payload: payloadData
	}
}

// =============================
// FETCHING INFO
// =============================

//gets called on dashboardInit
export function fetchThisUserInfo(userId){
	
	return dispatch => {
		dispatch(fetchingUser());
		
		axios.post(`${ROOT_URL}user/dashboardinit`, {userId})
			.then((response)=>{
				console.log("inside the fetchThisUserInfo with response:", response);
				dispatch(setEmployer(response.data.employer));
				dispatch(setUser(response.data.user));
			})
			.catch((error)=>{
				dispatch(fetchingThisUserError("Error: You must log-in before continuing!"))
			})

	}
}

// =============================
// LOGIN
// =============================

export function logInUserError(error) {
	if (error === 401) {
		return {
			type: LOGIN_USER_ERROR,
			errorMessage: 'Either the password or email are incorrect!'
		}
	}
}

//requires a user and token property
export function logInUserSuccess(data) {
	console.log("logInUserSuccess:", data);
	return {
		type: LOGIN_USER_SUCCESS,
		payload: data
	}
	
}

//gets the token passed from localStorage
export function logInOnLoad(token):Object{
	return dispatch => {
		dispatch(fetchingUser());

		axios.post(`${ROOT_URL}login/logcheck`, {token})
			.then((response)=>{


			//response contains uer, which is our decoded token
				
				//set token as part of our request headers
				setAuth(token);

				//send user information to be stored in the store
				dispatch(logInUserSuccess(response.data.user));
				
			})
			.catch((error)=>{
				dispatch(logInUserError(error.response.status));
			})
	}
}

//this will dispatch the users email and password to server for verification
export function logInUser(user) {
	/*user = {
    	email
        password
	};*/
	return dispatch => {
		
		dispatch(siteFetch());
		
		axios.post(`${ROOT_URL}login`, user)
			.then((response) => {
				//save token to local storage
				const token = response.data.token;
				localStorage.setItem('tkn', token);
				
				//set the token as part of our request header
				setAuth(token);

				console.log("the employer id response:", response.data.user.employerId);
				if(response.data.user.employerId !== null){
					console.log("this user has a registered employer and its:", response.data.employerId);
					dispatch(setEmployerAndUser(response));
					// dispatch(setEmployer(response.data.employer));
					// dispatch(logInUserSuccess(response.data.user));
					// dispatch(setSiteIdle());
				} else {
					console.log("this user does not have a registered employer");
					//data contains user, token
					dispatch(logInUserSuccess(response.data.user))
				}

			})
			.catch((error) => {

				console.log("The response from error in login in:", error);
				dispatch(logInUserError(error.response.status));
				
			})
	}
}

export function setEmployerAndUser(response){
	console.log('setEmployerAndUser:', response);
	return dispatch => {
		dispatch(setEmployer(response.data.employer));
		dispatch(logInUserSuccess(response.data.user));
		dispatch(setSiteIdle());
	}
}

export function registerCompLogin(response){
	return dispatch => {
		dispatch(setEmployer(response.data.employer));
		dispatch(logInUserSuccess(response.data.user));
		dispatch(setSiteIdle());
	}
}