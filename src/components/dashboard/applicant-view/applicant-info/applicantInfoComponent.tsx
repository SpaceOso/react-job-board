import * as React from 'react';
import {Applicants} from "../../../../types/index";

interface MyProps {
	applicant: Applicants
}

class ApplicantInfoComponent extends React.Component<MyProps> {
	constructor(props) {
		super(props);

		this.createSocialLinks = this.createSocialLinks.bind(this);
	}


	createSocialLinks() {
		let applicantLinks: any[] = [];
		const socialLinksites = [{link:'github', icon: 'icon-github'}, 'linkedin', 'website'];

		socialLinksites.map((social, key) => {
			let link = social.link.toString();
			if(this.props.applicant[link] !== null){
				// applicantLinks.push()
			}
		});

		applicantLinks.push(this.props.applicant.website !== null ? this.props.applicant.website : '');
		applicantLinks.push(this.props.applicant.linkedin !== null ? this.props.applicant.linkedin : '');
		applicantLinks.push(this.props.applicant.github !== null ? this.props.applicant.github : '');

		const socialLinks = applicantLinks.map((social, key) => {
			return <li key={key}>{social.link}</li>
		});

		return <ul>{socialLinks}</ul>
	}

	render() {
		const applicant = this.props.applicant;
		const applicantAddress = `${applicant.city}, ${applicant.state}, ${applicant.zip}`;
		const applicantEmail = this.props.applicant.email;
		const applicantPhone = this.props.applicant.cellPhone;

		return (
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