import {
    FETCHING_THIS_EMPLOYER_JOBS,
    GET_THIS_EMPLOYER_JOBS_SUCCESS,
    REGISTER_EMPLOYER_SUCCESS,
} from '../actions/employerDashboardActions';

import{
    SET_EMPLOYER,
    LOG_OUT_EMPLOYER
} from '../actions/authActions';
import {Employer, Job} from "../types/index";

const defaultState: Employer = {
    _id: null,
	name: '',
	location: {
		address: '',
		city: '',
		state: '',
		zip: 0
	},
	logoImg: '',
	socialMedia: {
		website: '',
		twitter: '',
		facebook: '',
		linkedin: ''
	},
	jobs: null,
};

// this deals with with the employer property of the state
function employerReducer(state = defaultState, action):any{

    switch (action.type){
        case FETCHING_THIS_EMPLOYER_JOBS:
            return state;
        case GET_THIS_EMPLOYER_JOBS_SUCCESS:
            return state;
        case REGISTER_EMPLOYER_SUCCESS:
            //will set employer after we register in the compRegisterComponent
            return state;
        case LOG_OUT_EMPLOYER:
            return {
	            ...defaultState
            };
        case SET_EMPLOYER:
            return {
                ...state,
                ...action.payload
            };
        default:
            return {
                ...state
            };
    }
}

export default employerReducer;