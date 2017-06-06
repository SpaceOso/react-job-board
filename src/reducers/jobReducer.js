//action types
import {GET_JOBS, GET_JOBS_ERROR, GET_JOBS_SUCCESS} from "../actions/jobActions";

/*reducers are just functions that get passed the action. We then set up switch statements to handle the action.type*/
function JobReducer(state={}, action){
	switch (action.type) {
		case GET_JOBS_SUCCESS:
			/*Need to set up the store jobs: property. It should be an object with it's properties
			 * set to be the id of each job for example:
			 * {
			 * 	jobs: {
			 * 		"3243fewf":{
			 * 			id: "3243fewf"
			 * 		}
			 * 	}
			 * }
			 * */

            let newJobs = {};

            for(const job in action.payload.data){
            	let currentJob = action.payload.data[job];
            	newJobs[currentJob._id] = {...currentJob};
			}


		return newJobs;
		case GET_JOBS_ERROR:
			console.log("inside the reducer and we have an error!!", action.payload);

			return state;
        default:
            return state;
    }
}

export default JobReducer;