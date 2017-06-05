import {REGISTER_USER} from '../actions/registerActions';

function userReducer(state = {}, action) {
	switch (action.type) {
		case REGISTER_USER:
			console.log("inside the register user reducer");
			console.log(action.payload.data.user._id);
			return action.payload.data.user._id;
		default:
			return state
		
	}
}

export default userReducer;