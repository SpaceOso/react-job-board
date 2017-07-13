import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import * as ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

//styles;
import './styles/main.scss';

//reducers
import rootReducer from './reducers/index.jsx';

//components
import AppContainer from './components/appContainer';

// import {StoreState} from './types/index';

const store = createStore(rootReducer,applyMiddleware(thunk, ReduxPromise));

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
