import {
	REGISTER_USER,
	FETCHING_USER,
	REGISTER_USER_ERROR,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR
} from '../actions/authActions';

function userReducer(state = {}, action) {
	//TODO need to figure out what data we're sending here
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			return {...state, userID: action.payload.data.user._id, error: null};
		
		case LOGIN_USER_SUCCESS:
			return {...state, user: action.payload.user, token: action.payload.token};
		
		case FETCHING_USER:
			return {...state, isFetching: true};
			
		case LOGIN_USER_ERROR:
			return {...state, error: action.errorMessage};
			
		default:
			return state
		
	}
}

export default userReducer;