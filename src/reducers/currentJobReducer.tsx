import {
	FIND_JOB_BY_ID,
	RESET_CURRENT_JOB,
	FETCHING_JOBS,
	SINGLE_JOB_SUCCESS,
	FETCHING_SINGLE_JOB} from '../actions/jobActions';
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
	    case FETCHING_SINGLE_JOB:
	    	return {
	    		...state,
			    isFetching: true
	    	};
	    case SINGLE_JOB_SUCCESS:
	    	console.log("inside reducuer:", action.payload);
	    	return {
			    ...state,
			    ...action.payload.data.job,
			    // ...action.payload.data.job.Employer,
			    isFetching: false
		    };
        default:
            return {
	            ...state,
            };
    }
}

export default currentJobPostReducer;