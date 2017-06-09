import { combineReducers } from 'redux';

import jobs from './jobReducer';
import currentJob from './currentJobReducer';
import user from './userReducer';

//these keys need to be named the same as the keys in the default state
const rootReducer = combineReducers({
	jobs,
	currentJob,
	user,
});

export default rootReducer;