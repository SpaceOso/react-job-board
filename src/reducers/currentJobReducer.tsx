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
			    employer: undefined
	    	};
	    case FETCHING_JOBS:
	    	return {
	    		...state,
			    isFetching: true
	    	};
	    case SINGLE_JOB_SUCCESS:
	    	console.log("inside SINGLE_JOB_SUCCESS..", action.payload.data.job);
	    	console.log("and current state is:", state);
	    	let testObject: any = {
			    ...state,
			    employer: {...action.payload.data.employer},
			    currentJob: {...action.payload.data.job},
			    isFetching: false
		    };

	    	console.log("and state we're sending...", testObject);
	    	return {
			    ...state,
			    // employer: {...action.payload.data.employer},
	            ...action.payload.data.job,
			    isFetching: false,
			    rico: "i thought htis waws sdijf"
		    };
        default:
            return {
	            ...state,
            };
    }
}

export default currentJobReducer;