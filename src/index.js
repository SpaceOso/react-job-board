import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';


import {BrowserRouter, Route, Link, Switch, HashRouter} from 'react-router-dom';

import {EmployerComponent} from './components/employerComponent';
import LayoutComponent from './components/layoutComponent';
import {UserComponent} from './components/userComponent';

//Utils
import {URL} from './utils/utils';
import JobListContainer from './containers/jobListContainer';


class App extends React.Component {
	constructor(props){
		super(props);
	}
	
	
	render() {
		console.log('render', this.state);

		return (
			<Provider  store={store}>
			<HashRouter>
				<div>
					<p><Link to="/user">Click me!</Link></p>
					<JobListContainer/>
					<LayoutComponent >
						<Switch>
							
							<Route exact path="/" component={EmployerComponent}/>
							<Route path="/user" component={UserComponent}/>
							{/*<EmployerComponent/>*/}
							{/*<h2>I'm between the header and footer...</h2>*/}
						</Switch>
					</LayoutComponent>
				</div>
			</HashRouter>
		</Provider>
		)
	}
}

render(<App/>, document.getElementById('root'));

// export default JobBoard;

//https://stackoverflow.com/questions/34607841/react-router-nav-bar-example