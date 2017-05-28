/*reducers are just functions that get passed the action. We then set up switch statements to handle the action.type*/
function JobReducer(state=[], action){
	console.log("inside the JobReducer");
	console.log(action);
	return state;
}

export default JobReducer;