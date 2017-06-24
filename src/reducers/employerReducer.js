import {
    FETCHING_THIS_EMPLOYER_JOBS,
    GET_THIS_EMPLOYER_JOBS_SUCCESS,
    REGISTER_EMPLOYER_SUCCESS
} from '../actions/employerDashboardActions';


// this deals with with the employer property of the state
function employerReducer(state={}, action){

    switch (action.type){
        case FETCHING_THIS_EMPLOYER_JOBS:
            return state;
        case GET_THIS_EMPLOYER_JOBS_SUCCESS:
            return state;
        case REGISTER_EMPLOYER_SUCCESS:
            //will set employer after we register in the compRegisterComponent
            return state;
        default:
            return state;
    }
}

export default employerReducer;