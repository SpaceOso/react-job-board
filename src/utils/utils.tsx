declare let process : {
	env: {
		NODE_ENV: string,
		secretekey: string
	}
};

let URL_Test = 'https://mr-job-board.herokuapp.com/';
console.log(process.env.NODE_ENV);
console.log("process secreteKey:", process.env.secretekey);


if(process.env.NODE_ENV === "development"){
	console.log("WE ARE IN DEVELOPMENT MODE!!!!!!!!!!!!");
	URL_Test = 'http://localhost:4200/';
}

export const URL = URL_Test;
import axios from 'axios';

export function setAuth(token){
	console.log("setAuth()");
	if(token){

		localStorage.setItem('tkn', token);
		console.log("setAuth() token:", token);
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

export function HelloRico(){
	return 'Hello Rico';
}