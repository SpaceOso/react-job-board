import React from 'react';
import {render} from 'react-dom';

import {EmployerComponent} from './components/employerComponent';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Loaded up react</h1>
				<EmployerComponent />
			
			</div>
		)
	}
}

render(<App/>, document.getElementById('root'));

// export default JobBoard;