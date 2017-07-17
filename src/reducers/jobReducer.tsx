//action types
import { GET_JOBS_ERROR, GET_JOBS_SUCCESS, FETCHING_JOBS} from "../actions/jobActions";
import {StoreState} from "../types/index";

/*reducers are just functions that get passed the action. We then set up switch statements to handle the action.type*/
function JobReducer(state: StoreState, action) {
    switch (action.type) {
        case GET_JOBS_SUCCESS:

            let newJobs = {};

            for (const job in action.payload.data) {
                let currentJob = action.payload.data[job];
                newJobs[currentJob._id] = {...currentJob};
            }

            return newJobs;
        case GET_JOBS_ERROR:

            return state;
        case FETCHING_JOBS:
            return {
                ...state,
                isFetching: true};
        default:
            return {
                ...state
            };
    }
}

export default JobReducer;