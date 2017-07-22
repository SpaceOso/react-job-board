import { combineReducers } from 'redux';

import jobs from './jobReducer';
import currentJobPost from './currentJobReducer';
import user from './userReducer';
import employer from './employerReducer';
import siteFetching from './siteFetchingReducer';


//these keys need to be named the same as the keys in the default state
const rootReducer = combineReducers({
	jobs,
	currentJobPost,
	user,
	employer,
	siteFetching
});

export default rootReducer;