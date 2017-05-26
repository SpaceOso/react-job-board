import React from 'react';
import {render} from 'react-dom';

import {BrowserRouter, Route, Link, Switch, HashRouter} from 'react-router-dom';

import {EmployerComponent} from './components/employerComponent';
import LayoutComponent from './components/layoutComponent';
import {UserComponent} from './components/userComponent';


class App extends React.Component {
	componentDidMount() {
		axios.get('/user')
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	render() {
		return (
			<HashRouter>
				<div>
					<p><Link to="/user">Click me!</Link></p>
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
		)
	}
}

render(<App/>, document.getElementById('root'));

// export default JobBoard;

//https://stackoverflow.com/questions/34607841/react-router-nav-bar-example