import {REGISTER_USER, FETCHING_USER, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS} from '../actions/authActions';

function userReducer(state = {}, action) {
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			console.log("inside the register user reducer with:", action);
			console.log(action.payload.data.user._id);
			// TODO will need more information than just the user ID
			//TODO should have a flag canNavigate to tell the form that it can send me into the dashboard
			/*So the things that we need to do is:
			* Don't save password to object
			* include name, last name, employerID, userID...maybe we don't need user ID
			* Need to start adding tokens to payloads*/
			return action.payload.data.user._id;
		case LOGIN_USER_SUCCESS:
			console.log("we have succesfully logged in! and the user was:");
			console.log(action);
			return state;
		case FETCHING_USER:
			return {...state, isFetching: true};
		default:
			return state
		
	}
}

export default userReducer;