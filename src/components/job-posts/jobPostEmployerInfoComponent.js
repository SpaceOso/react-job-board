import React from 'react';

class JobPostEmployerInfoComponent extends React.Component{
	constructor(props){
		super(props);
		console.log("JobPostEmployer:", this.props);
	}
	render(){
		return (
			<div>
				<h1>This job was created by  </h1>
			</div>
		)
	}
}

export default JobPostEmployerInfoComponent;