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
			return {
				...state,
				userID: action.payload.data.user._id,
				error: null,
				isFetching: false
			};
		
		case LOGIN_USER_SUCCESS:
			console.log('LOGIN_USER_SUCCESS action:', action);
			return {
				...state,
				...action.payload.data.user,
				token: action.payload.data.token,
				error: null,
				auth: true,
				isFetching: false
			};
		
		case FETCHING_USER:
			return {...state, isFetching: true};
			
		case LOGIN_USER_ERROR:
			return {
				...state,
				error: action.errorMessage,
				isFetching: false
			};
			
		default:
			return state
		
	}
}

export default userReducer;