import { combineReducers } from 'redux';

import jobs from './jobReducer';
import currentJob from './currentJobReducer';
import user from './userReducer';
import employer from './employerReducer';

//these keys need to be named the same as the keys in the default state
const rootReducer = combineReducers({
	jobs,
	currentJob,
	user,
	employer
});

export default rootReducer;