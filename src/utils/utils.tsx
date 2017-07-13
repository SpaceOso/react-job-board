export const URL = 'http://localhost:4200/';
import axios from 'axios';

export function setAuth(token){
	if(token){
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
}

export function removeAuth(){
	delete axios.defaults.headers.common['Authorization'];
}

export function setFormState(state, key, event){
	let keyObject = {...state};
	
	keyObject[key] = event;
	
	return keyObject;
}