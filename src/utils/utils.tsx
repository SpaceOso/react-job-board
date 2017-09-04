declare let process : {
	env: {
		NODE_ENV: string,
		SECRET_KEY: string,
	}
};

let URL_Test = 'https://mr-job-board.herokuapp.com/';
let set_IMG_URL = 'http://localhost:3000/public/assets/uploads/';

if(process.env.NODE_ENV === "dev"){
	console.log("WE ARE IN DEVELOPMENT MODE!!!!!!!!!!!!");
	URL_Test = 'http://localhost:4200/';
} else {
	console.log("We are in prod mode");
	set_IMG_URL = 'https://s3.us-east-2.amazonaws.com/mrjobboard/';
}

export const IMG_URL = set_IMG_URL;

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