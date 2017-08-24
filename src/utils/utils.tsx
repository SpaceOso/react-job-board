declare let process : {
	env: {
		NODE_ENV: string,
		SECRET_KEY: string,
	}
};

let URL_Test = 'https://mr-job-board.herokuapp.com/';

if(process.env.NODE_ENV === "development"){
	console.log("WE ARE IN DEVELOPMENT MODE!!!!!!!!!!!!");
	URL_Test = 'http://localhost:4200/';
}

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