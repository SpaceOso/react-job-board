export const URL = 'http://localhost:4200/';
import axios from 'axios';

export function setAuth(token){
	console.log("set auth is being called");
	if(token){
		console.log("token that we're saving:", token);
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
}

export function removeAuth(){
	delete axios.defaults.headers.common['Authorization'];
}