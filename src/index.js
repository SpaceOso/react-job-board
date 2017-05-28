import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';


//styles;
import styles from './styles/main.scss';

//Utils
import {URL} from './utils/utils';

//reducers
import rootReducer from './reducers/index';

//components
import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class JobBoard extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log('render', this.state);

        return (
            <Provider store={createStoreWithMiddleware(rootReducer)}>
                <App />
            </Provider>
        )
    }
}

render(<JobBoard/>, document.getElementById('root'));

// export default JobBoard;

//https://stackoverflow.com/questions/34607841/gireact-router-nav-bar-example