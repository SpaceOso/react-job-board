import * as React from 'react';
import {Applicants} from "../../../../types/index";
import {ROOT_URL} from "../../../../actions/index";
import {IMG_URL, LOCAL_URL} from "../../../../utils/utils";

interface MyProps {
	applicant: Applicants
}

class ApplicantInfoComponent extends React.Component<MyProps> {
	constructor(props) {
		super(props);

		this.createSocialLinks = this.createSocialLinks.bind(this);
	}


	createSocialLinks() {
		const socialLinksites = [
			{
				link: 'github',
				icon: 'icon-github.svg'
			},
			{
				link: 'linkedin',
				icon: 'icon-linkedin.svg'
			},
			{
				link: 'website',
				icon: 'icon-web.svg'
			}];

		const socialLinks = socialLinksites.map((social, key) => {
			let link = social.link.toString();
			if (this.props.applicant[link] !== null && this.props.applicant[link].length > 0) {
				return (
					<li key={key}>
						<a href={this.props.applicant[link]}>
							<img src={`${LOCAL_URL}${require(`../../../../assets/images/${social.icon}`)}`} alt="link"/>
						</a>
					</li>
				)
			}
		});

		return (<ul>{socialLinks}</ul>)
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
					<ul>{this.createSocialLinks()}</ul>
				</div>
			</div>
		)
	}
}

export default ApplicantInfoComponent;