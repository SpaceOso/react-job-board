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
import {StoreState} from "../types/index";

const initialState = {
	userId: "",
	accountType: "user",
	authorized: false,
	email: "",
	employer: "",
	firstName: "",
	lastName: "",
	isFetching: false
};


function userReducer(state: StoreState, action) {
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				...action.payload,
                authorized: true,
				isFetching: false,
				userRegistered: true,
			};
		
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				...action.payload,
                authorized: true,
				isFetching: false,
				
			};
		case LOG_OUT_USER:
			return {};
			
		case FETCHING_USER:
			return {
				...state,
				isFetching: true,
			};
			
		case SET_USER:
			return {
				...state,
				isFetching: false,
				...action.payload,
                authorized: true,
			};
		case FETCHING_THIS_USER_ERROR:
			return {
				...state,
				isFetching: false,
                authorized: false,
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
			return {
				...state
			}
		
	}
}

export default userReducer;