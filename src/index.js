import React from 'react';
import {render} from 'react-dom';

import {BrowserRouter, Route, Link, Switch, HashRouter} from 'react-router-dom';

import {EmployerComponent} from './components/employerComponent';
import LayoutComponent from './components/layoutComponent';
import {UserComponent} from './components/userComponent';

//Utils
import {URL} from './utils/utils';

class App extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {jobs: ''};
		// this.componentDidMount = this.componentDidMount.bind(this);
	}
	
	componentDidMount() {
		console.log("monuting..");
		let self = this;
		
		axios.get(`${URL}${'jobposts'}`)
			.then(function (response) {
				console.log(response.data);
				let jobs = response.data.map(obj => obj.jobTitle);
				console.log("wut", jobs);
				self.setState({jobs});
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	
	render() {
		console.log('render', this.state);

		return (
			<HashRouter>
				<div>
					<p><Link to="/user">Click me!</Link></p>
					<p>the jobs {this.state.jobs}</p>
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

//https://stackoverflow.com/questions/34607841/gireact-router-nav-bar-example