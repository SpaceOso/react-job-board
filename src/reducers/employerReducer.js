import {FETCHING_THIS_EMPLOYER_JOBS, GET_THIS_EMPLOYER_JOBS_SUCCESS} from '../actions/employerDashboardActions';


function employerReducer(state={}, action){

    switch (action.type){
        case FETCHING_THIS_EMPLOYER_JOBS:
            console.log("fetching the jobs for the dashboard...");
            return state;
        case GET_THIS_EMPLOYER_JOBS_SUCCESS:
            console.log("all the jobs have been returned into the dashboard...");
            return state;
        default:
            return state;
    }
}

export default employerReducer;