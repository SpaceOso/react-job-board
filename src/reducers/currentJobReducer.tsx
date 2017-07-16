import {FIND_JOB_BY_ID, RESET_CURRENT_JOB, FETCHING_JOBS, SINGLE_JOB_SUCCESS} from '../actions/jobActions';
import {StoreState} from "../types/index";


function currentJobReducer(state: StoreState, action): StoreState{
    switch(action.type){

        case FIND_JOB_BY_ID:
	
	         return {
		        ...state,
		        employer: {...action.payload.data.employer},
		        currentJob: {...action.payload.data.job}
	        };

	    case RESET_CURRENT_JOB:
	    	return {
	    		...state,
			    currentJob: undefined,
			    employer:undefined
	    	};
	    case FETCHING_JOBS:
	    	return {
	    		...state,
			    isFetching: true
	    	};
	    case SINGLE_JOB_SUCCESS:
	    	console.log("inside SINGLE_JOB_SUCCESS..", action.payload.data.job)
	    	return {
			    ...state,
			    employer: {...action.payload.data.employer},
			    currentJob: {...action.payload.data.job},
			    isFetching: false
		    };
        default:
            return {
	            ...state,

            };
    }
}

export default currentJobReducer;