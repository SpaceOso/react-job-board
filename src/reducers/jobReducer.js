//action types
import {GET_JOBS} from "../actions/jobActions";

/*reducers are just functions that get passed the action. We then set up switch statements to handle the action.type*/
function JobReducer(state={}, action){
	switch (action.type) {
		case GET_JOBS:
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
        default:
            return state;
    }
}

export default JobReducer;