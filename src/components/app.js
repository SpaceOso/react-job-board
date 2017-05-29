import React from 'react';


import {BrowserRouter, Route, Link, Switch, HashRouter} from 'react-router-dom';

import {EmployerComponent} from './employerComponent';
import LayoutComponent from './layoutComponent';
import {UserComponent} from './userComponent';
import JobListContainer from '../containers/jobListContainer';
import {JumboTron} from '../components/jumboTron';


class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<LayoutComponent >
					<div className="app-container">
						<Route path="/" components={JumboTron}/>
						<Route path="/" component={JobListContainer}/>
						<Switch>
							<Route path="/employer" component={EmployerComponent}/>
							<Route path="/user" component={UserComponent}/>
						</Switch>
					</div>
				</LayoutComponent>
			</HashRouter>
		)
	}
}

export default App;