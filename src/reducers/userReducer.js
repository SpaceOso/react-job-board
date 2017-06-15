import {
	REGISTER_USER,
	FETCHING_USER,
	REGISTER_USER_ERROR,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
	LOG_OUT_USER,
	SET_USER
} from '../actions/authActions';

function userReducer(state = {}, action) {
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				userId: action.payload.id,
				error: null,
				isFetching: false,
				userRegistered: true
			};
		
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				...action.payload.user,
				token: action.payload.token,
				error: null,
				auth: true,
				isFetching: false
			};
		case LOG_OUT_USER:
			return {};
		case FETCHING_USER:
			return {...state, isFetching: true};
		case SET_USER:
			console.log('SETTING_USER', action.payload);
			return {
				...state,
				isFetching: false,
				...action.payload
			};
		case LOGIN_USER_ERROR:
			return {
				...state,
				error: action.errorMessage,
				isFetching: false
			};
		case REGISTER_USER_ERROR:
			// todo need to properly handle this case
			return{
				...state,
			}
		default:
			return state
		
	}
}

export default userReducer;