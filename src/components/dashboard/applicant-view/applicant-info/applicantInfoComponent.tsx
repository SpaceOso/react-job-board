import * as React from 'react';
import {Applicants} from "../../../../types/index";

interface MyProps{
	applicant: Applicants
}

class ApplicantInfoComponent extends React.Component<MyProps>{
	constructor(props){
		super(props);
	}

	render(){
		let applicant = this.props.applicant;
		let applicantAddress = `${applicant.city}, ${applicant.state}, ${applicant.zip}`;
		let applicantEmail = this.props.applicant.email;
		let applicantPhone = this.props.applicant.cellPhone;

		return(
			<div>
				I'm the ApplicantInfoComponent
				<div>
					<h1>{applicant.firstName} {applicant.lastName}</h1>
					<p>{applicantAddress}</p>
					<p>{applicantPhone}</p>
					<p>{applicantEmail}</p>
				</div>
			</div>
		)
	}
}

export default ApplicantInfoComponent;