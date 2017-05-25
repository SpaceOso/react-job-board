import React from 'react';
import {render} from 'react-dom';

class JobBoard extends React.Component{
	render(){
		return(
			<h1>Loaded up react</h1>
		)
	}
}

render(<JobBoard/>, document.getElementById('root'));

// export default JobBoard;