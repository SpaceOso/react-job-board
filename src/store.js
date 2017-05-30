import { createStore } from 'redux';

import rootReducer from './reducers/index';

//state property names match the name of the reducers
const defaultState = {
	jobs: {},
	currentJob: ''
};

let store = createStore(rootReducer, defaultState);

export default store;