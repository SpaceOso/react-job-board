//action types
import {GET_JOBS, GET_JOBS_ERROR, GET_JOBS_SUCCESS, FETCHING_JOBS} from "../actions/jobActions";

/*reducers are just functions that get passed the action. We then set up switch statements to handle the action.type*/
function JobReducer(state = {}, action) {
    switch (action.type) {
        case GET_JOBS_SUCCESS:

            let newJobs = {};

            for (const job in action.payload.data) {
                let currentJob = action.payload.data[job];
                newJobs[currentJob._id] = {...currentJob};
            }

            return newJobs;
        case GET_JOBS_ERROR:
            console.log("inside the reducer and we have an error!!", action.payload);

            return state;
        case FETCHING_JOBS:

            console.log("currently fetching jobs!!");

            return {...state, isFetching: true};
        default:
            return state;
    }
}

export default JobReducer;