import * as React from 'react';
import {Link} from 'react-router-dom';

declare let process : {
	env: {
		NODE_ENV: string,
		SECRET_KEY: string,
	}
};

let URL_Test = 'https://mr-job-board.herokuapp.com/';
let set_IMG_URL = 'http://localhost:3000/public/assets/uploads/';
let set_LOCAL_URL = 'http://localhost:3000/';

if(process.env.NODE_ENV === "development"){
	console.log("WE ARE IN DEVELOPMENT MODE!!!!!!!!!!!!");
	URL_Test = 'http://localhost:4200/';
} else {
	console.log("We are in prod mode");
	set_IMG_URL = 'https://s3.us-east-2.amazonaws.com/mrjobboard/';
	set_LOCAL_URL = 'http://mr-job-board.herokuapp.com/';
}

export const IMG_URL = set_IMG_URL;
export const LOCAL_URL = set_LOCAL_URL;

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
