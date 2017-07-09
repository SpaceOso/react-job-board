import React from 'react';

class ApplicantListComponent extends React.Component{
	render(){
		return(
			<div>
				<h1>Welcome back {this.props.user.firstName}!!</h1>
				<h1>Click to view info on applicants of {this.props.employer.name}</h1>
				I'm the applicant list container
				{/*{console.log("the employer...", this.props.employer)}*/}
				I'm the applicant list container
				I'm the applicant list container
				I'm the applicant list container
			</div>
		)
	}
}

export default ApplicantListComponent;