import React from 'react';

class ApplicantListComponent extends React.Component{
	render(){
		return(
			<div>
				I'm the applicant list container
				{console.log("the employer...", this.props.employer)}
				I'm the applicant list container
				I'm the applicant list container
				I'm the applicant list container
			</div>
		)
	}
}

export default ApplicantListComponent;