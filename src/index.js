import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import App from './components/app';


//Utils
import {URL} from './utils/utils';


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

// export default JobBoard;

//https://stackoverflow.com/questions/34607841/gireact-router-nav-bar-example