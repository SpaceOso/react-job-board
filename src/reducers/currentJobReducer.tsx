import {FIND_JOB_BY_ID, RESET_CURRENT_JOB, FETCHING_JOBS, SINGLE_JOB_SUCCESS} from '../actions/jobActions';
import {CurrentJobPost} from "../types/index";


// function currentJobReducer(state: StoreState, action): StoreState{
// function currentJobReducer(state: StoreState, action): StoreState{
function currentJobPostReducer(state: CurrentJobPost, action): CurrentJobPost{
    switch(action.type){

	    case FIND_JOB_BY_ID:
	         return {
		        ...state,
		        // employer: {...action.payload.data.employer},
		        // currentJob: {...action.payload.data.job}
	        };
	    case RESET_CURRENT_JOB:
	    	return {
	    		...state,
			    // currentJob: undefined,
			    // employer: undefined
	    	};
	    case FETCHING_JOBS:
	    	return {
	    		...state,
	    	};
	    case SINGLE_JOB_SUCCESS:
	    	return {
			    ...state,
	            ...action.payload.data.job,
			    // employer: {...action.payload.data.employer},
			    isFetching: false
		    };
        default:
            return {
	            ...state,
            };
    }
}

export default currentJobPostReducer;