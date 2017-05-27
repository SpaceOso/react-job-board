import React from 'react';
import {render} from 'react-dom';

import {BrowserRouter} from 'react-router-dom';

import {EmployerComponent} from './components/employerComponent';
import LayoutComponent from './components/layoutComponent';

class App extends React.Component {
	render() {
		return (
			<div>
				<LayoutComponent >
					<EmployerComponent/>
					<h2>I'm between the header and footer...</h2>
				</LayoutComponent>
			</div>
		)
	}
}

render(<App/>, document.getElementById('root'));

// export default JobBoard;

//https://stackoverflow.com/questions/34607841/gireact-router-nav-bar-example