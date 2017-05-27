import { combineReducers } from 'redux';

import jobs from './jobReducer';

//these keys need to be named the same as the keys in the default state
const rootReducer = combineReducers({
	jobs
});

export default rootReducer;