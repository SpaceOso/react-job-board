import {FIND_JOB_BY_ID, RESET_CURRENT_JOB, FETCHING_JOBS, SINGLE_JOB_SUCCESS} from '../actions/jobActions';


function currentJobReducer(state = {employer: null, job: null}, action){
    switch(action.type){

        case FIND_JOB_BY_ID:
	
	         return {
		        ...state,
		        employer: {...action.payload.data.employer},
		        job: {...action.payload.data.job},
	        };

	    case RESET_CURRENT_JOB:
	    	return {...state, job: null, employer:null};
	    case FETCHING_JOBS:
	    	return {...state, isFetching: true};
	    case SINGLE_JOB_SUCCESS:
	    	return {
			    ...state,
			    employer: {...action.payload.data.employer},
			    job: {...action.payload.data.job},
			    isFetching: false
		    };
        default:
            return state;
    }
}

export default currentJobReducer;