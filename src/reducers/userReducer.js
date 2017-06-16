import {
	REGISTER_USER,
	FETCHING_USER,
	REGISTER_USER_ERROR,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR,
	LOG_OUT_USER,
	SET_USER,
	FETCHING_THIS_USER_ERROR
} from '../actions/authActions';

function userReducer(state = {}, action) {
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				userId: action.payload.id,
				unAuthorized: false,
				isFetching: false,
				userRegistered: true,
			};
		
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				...action.payload.user,
				unAuthorized: false,
				auth: true,
				isFetching: false,
				
			};
		case LOG_OUT_USER:
			return {};
			
		case FETCHING_USER:
			return {...state,
				isFetching: true,
				unAuthorized: false,
			};
			
		case SET_USER:
			console.log('SETTING_USER', action.payload);
			return {
				...state,
				isFetching: false,
				...action.payload,
				unAuthorized: false,
			};
		case FETCHING_THIS_USER_ERROR:
			console.log("you need to login!. case: FETCHING_THIS_USER_ERROR");
			return {
				...state,
				isFetching: false,
				unAuthorized: true,
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
			};
			
		default:
			return state
		
	}
}

export default userReducer;