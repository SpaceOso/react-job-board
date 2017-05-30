import { combineReducers } from 'redux';

import jobs from './jobReducer';
import currentJob from './currentJobReducer';

//these keys need to be named the same as the keys in the default state
const rootReducer = combineReducers({
	jobs,
	currentJob
});

export default rootReducer;