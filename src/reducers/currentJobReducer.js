import {FIND_JOB_BY_ID} from '../actions/jobActions';


function currentJobReducer(state = {employer: null, job: null}, action){
    console.log("inside the currentJobReducer");
    switch(action.type){

        case FIND_JOB_BY_ID:
            console.log("we are trying to find a job by id");
            console.log("state:", state);
            console.log("action:", action);
	
	         return {
		        ...state,
		        employer: {...action.payload.data.employer},
		        job: {...action.payload.data.job},
	        };

        default:
            return state;
    }
}

export default currentJobReducer;