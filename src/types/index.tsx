// src/types/index.tsx

import currentJobReducer from "../reducers/currentJobReducer";
export interface Job{
	_id: string | null,
	jobTitle: string,
	jobDescription: string,
	employerName: string,
	employerId: {
		_id: string,
		location: {
			address: string,
			city: string,
			state: string,
			zip: string
		}
	},
	employerLogo?: string,
	updatedAt?: string
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

/**
 * @type AuthUser
 * @property {(string | null)} firstName - The users first name
 * @property {(string | null)} lastName - The users last name
 * @property {(string | null)} email - The users email
 * @property {(string | null)} password - The users hashed password //todo need to has this
 */
export interface AuthUser{
	firstName: string | null,
	lastName: string | null,
	email: string | null,
	password: string | null,
}

/**
 * @type User
 * @property {(string | null)} employerId - This gets set after the user creates an employer account after log-in in
 * @property {(boolean | null)} isAuth - This gets set after the user logs in or we authenticate the JWT
 * @property {(boolean | null)} isFetching - We use this to display a spinner component if the user is waiting for async operation
 * @property {(string | null)} error - We currently are not using this //todo make sure if save to remove
 */
export interface User extends AuthUser{
	_id: string | null,
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