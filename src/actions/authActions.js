import axios from 'axios';
import {ROOT_URL} from './index';
import jwt from 'jsonwebtoken';

import setAuth from '../utils/utils';

export const REGISTER_USER = 'REGISTER_USER';
export const FETCHING_USER = 'FETCHING_USER';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';


export function registerUserSuccess(user) {
	console.log('inside the registeredUserSuccess with the following user:');
	console.log(user);
	return {
		type: REGISTER_USER_SUCCESS,
		payload: user
	}
}

export function registerUserError() {
	console.log("there was an error and we're inside the register user error function");
	return {
		type: REGISTER_USER_ERROR,
		payload: {isFetching: false}
	}
}

export function fetchingUser() {
	return {
		type: FETCHING_USER,
		payload: {isFetching: true}
	}
}

export function registerUser(userData) {
	
	return dispatch => {
		
		dispatch(fetchingUser());
		
		axios.post(`${ROOT_URL}register`, userData)
			.then((response) => {
				
				dispatch(registerUserSuccess(response.data.user));
				
			})
			.catch((error) => {
				
				dispatch(registerUserError(error));
				
			});
	}
	
};

// =============================
// CLEAR
// =============================

export function logOutUser(){
	return{
		type: LOG_OUT_USER,
		payload: "user being logged out..."
	}
}


// =============================
// LOGIN
// =============================

export function logInUserError(error) {
	console.log("inside the loginUser error page with:", error);
	if (error === 401) {
		return {
			type: LOGIN_USER_ERROR,
			errorMessage: 'Either the password or email are incorrect!'
		}
	}
}

export function logInUserSuccess(data) {
	
	
	return {
		type: LOGIN_USER_SUCCESS,
		payload: data
	}
	
}

export function logInUser(user) {
	
	return dispatch => {
		
		dispatch(fetchingUser());
		
		axios.post(`${ROOT_URL}login`, user)
			.then((response) => {
				//save token to local storage
				const token = response.data.token;
				
				localStorage.setItem('tkn', token);
				
				setAuth(token);
				
				console.log('decoded', jwt.decode(token));
				
				dispatch(logInUserSuccess(response.data))
				
			})
			.catch((error) => {
				
				dispatch(logInUserError(error.response.status));
				
			})
	}
	
}

