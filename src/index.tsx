import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import * as ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

//styles;
import './styles/main.scss';

//reducers
import rootReducer from './reducers/index';

//components
import AppContainer from './components/appContainer';
import {composeWithDevTools} from "redux-devtools-extension";

import {StoreState} from './types/index';

const store = createStore<StoreState>(rootReducer, composeWithDevTools(
	applyMiddleware(thunk, ReduxPromise))
);

// const store = createStore(rootReducer, composeWithDevTools(
// 	applyMiddleware(thunk, ReduxPromise))
// );

// setAuth(localStorage.getItem('tkn'));

class JobBoard extends React.Component {

	render() {

		return (
			<Provider store={store}>
				<div>
					<AppContainer />
				</div>
			</Provider>
		)
	}
}

render(<JobBoard/>, document.getElementById('root'));
