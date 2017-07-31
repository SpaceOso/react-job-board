// src/types/index.tsx

import currentJobReducer from "../reducers/currentJobReducer";
export interface Job{
	_id: string | null,
	jobTitle: string,
	jobDescription: string,
	employerName: string,
	employerId?: string,
	employerLogo?: string
}

export interface SiteError{
	typeOfError: string,
	message: string,
}


export interface privateJobView extends Job{
	applicants: string[]
}

export interface SiteErrors{
		login: SiteError | null,
		dashBoard: SiteError | null,
		dataRequest: SiteError | null
}

export interface SiteFetching{
	isFetching: boolean,

}

export interface User{
	_id: string | null,
	firstName: string | null,
	lastName: string | null,
	email: string | null,
	password: string | null,
	employerId: string | null,
	isAuth: boolean | null,
	isFetching: boolean | null,
	error: string | null
}

export interface Employer{
	_id: string | null
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
	} ,
	jobs: Job[] | null,
	isFetching: boolean | null
}

export interface CurrentJobPost extends Job , Employer{
	isFetching: boolean
}

export interface privateEmployerView extends Employer{
	applicants: User[]
}

export interface StoreState {
	jobs?: Job[],
	user?: User | null,
	employer?: Employer | null,
	currentJobPost?: CurrentJobPost,
	siteFetching?: SiteFetching,
	siteErrors?: SiteErrors
}