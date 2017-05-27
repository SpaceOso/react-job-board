import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getJobs} from '../actions/jobActions';


class JobListContainer extends React.Component{
	constructor(props){
		super(props);
		
		this.getJobs = this.getJobs.bind(this);
	}
	
	
	getJobs(){
		console.log("calling getJobs");
		this.props.getJobs();
	}
	
	
	render(){
		return(
			<div>
				I'm a joblist container;
				<button onClick={this.getJobs}>click me for jobs!!</button>
			</div>
		)
	}
};

function mapDispatchToProps(dispatch){
	return bindActionCreators({getJobs}, dispatch);
}

export default connect(null, mapDispatchToProps)(JobListContainer);