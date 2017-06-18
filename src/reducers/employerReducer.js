import {
    FETCHING_THIS_EMPLOYER_JOBS,
    GET_THIS_EMPLOYER_JOBS_SUCCESS,
} from '../actions/employerDashboardActions';


// this deals with with the employer property of the state
function employerReducer(state={}, action){

    switch (action.type){
        case FETCHING_THIS_EMPLOYER_JOBS:
            return state;
        case GET_THIS_EMPLOYER_JOBS_SUCCESS:
            return state;
        default:
            return state;
    }
}

export default employerReducer;