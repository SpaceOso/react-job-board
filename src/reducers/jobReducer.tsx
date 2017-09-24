//action types
import { GET_JOBS_ERROR, GET_JOBS_SUCCESS, FETCHING_JOBS} from "../actions/jobActions";
import {StoreState} from "../types/index";

/*reducers are just functions that get passed the action. We then set up switch statements to handle the action.type*/
function JobReducer(state: StoreState, action) {
    switch (action.type) {
        case GET_JOBS_SUCCESS:

            let newJobs = {};
            let jobDateRegex: RegExp = /.+?(?=T)/g;

            for (const job in action.payload.data) {
                let currentJob = action.payload.data[job];

	            let splitDate = currentJob.createdAt.match(jobDateRegex)[0].split('-');
	            currentJob.createdAt = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;

                newJobs[currentJob._id] = {...currentJob};
            }

            console.log("the final jobs:", newJobs);

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