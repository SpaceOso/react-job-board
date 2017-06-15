import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

import setAuth from './utils/utils';

//styles;
import styles from './styles/main.scss';


//reducers
import rootReducer from './reducers/index';

//components
import App from './components/app';


const store = createStore(rootReducer,applyMiddleware(thunk, ReduxPromise));

// setAuth(localStorage.getItem('tkn'));

class JobBoard extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

render(<JobBoard/>, document.getElementById('root'));
