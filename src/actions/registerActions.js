import axios from 'axios';
import {ROOT_URL} from './index';

export const REGISTER_USER = 'REGISTER_USER';

export function registerUser(userData){
	console.log("Registering a new user with the following data:");
	console.log(userData);
	
	console.log("the URL", `${ROOT_URL}register`);
	const request = axios.post(`${ROOT_URL}register`, userData);
	
	return {
		type: REGISTER_USER,
		payload: request
	}
};

