// src/types/index.tsx

import currentJobReducer from "../reducers/currentJobReducer";
export interface Job{
	_id?: string,
	jobTitle: string,
	jobDescription: string,
	employerName: string,
	employerId?: string,
	employerLogo?: string
}

export interface privateJobView extends Job{
	applicants: string[]
}

export interface isFetching{
	isFetching: boolean
}

export interface User{
	_id: string,
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	employerId?: string,
	userRegistered: boolean,
	isAuth: boolean,
	isFetching: boolean
}

export interface Employer{
	name: string,
	location: {
		address: string,
		city: string,
		state: string,
		zip: number
	},
	logoImg: string,
	socialMedia: {
		website: string,
		twitter: string,
		facebook: string,
		linkedin: string
	},
	jobs: Job[],
}

export interface CurrentJobPost extends Job , Employer{}

export interface privateEmployerView extends Employer{
	applicants: User[]
}

export interface StoreState {
	jobs?: Job[],
	user?: User,
	employer?: Employer,
	currentJobPost?: CurrentJobPost,
	isFetching?: boolean
}