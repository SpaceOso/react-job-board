import {FIND_JOB_BY_ID} from '../actions/jobActions';


function currentJobReducer(state = null, action){
    console.log("inside the currentJobReducer");
    switch(action.type){

        case FIND_JOB_BY_ID:
            console.log("we are trying to find a job by id");
            return state;

        default:
            return state;
    }
}

export default currentJobReducer;