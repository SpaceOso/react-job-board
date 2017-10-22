import * as React from 'react';
import {Applicants} from "../../../../types/index";

interface MyProps{
	applicant: Applicants
}

class ApplicantInfoComponent extends React.Component<MyProps>{
	constructor(props){
		super(props);

		this.createSocialLinks = this.createSocialLinks.bind(this);
	}


	createSocialLinks(){
		let applicantLinks: string[] = [];
		applicantLinks.push(this.props.applicant.website !== null ? this.props.applicant.website : '');
		applicantLinks.push(this.props.applicant.linkedin !== null ? this.props.applicant.linkedin : '');
		applicantLinks.push(this.props.applicant.github !== null ? this.props.applicant.github : '');

		const socialLinks = applicantLinks.map((link, key) =>{
			return <li key={key}>{link}</li>
		});

		return <ul>{socialLinks}</ul>
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
					{this.createSocialLinks()}
				</div>
			</div>
		)
	}
}

export default ApplicantInfoComponent;