import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';


//styles;
import styles from './styles/main.scss';


//reducers
import rootReducer from './reducers/index';

//components
import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const store = createStore(rootReducer,applyMiddleware(thunk, ReduxPromise));

class JobBoard extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log('render', this.state);

        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

render(<JobBoard/>, document.getElementById('root'));
