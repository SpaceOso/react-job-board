import * as React from 'react';
import {Applicants} from "../../../../types/index";
import {ROOT_URL} from "../../../../actions/index";
import {IMG_URL, LOCAL_URL} from "../../../../utils/utils";

//styles
import './applicantInfoComponent.scss';


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
					<li key={key} >
						<a href={this.props.applicant[link]}>
							<img src={`${LOCAL_URL}${require(`../../../../assets/images/${social.icon}`)}`} alt="link"/>
						</a>
					</li>
				)
			}
		});

		return (<ul className={'social-links'}>{socialLinks}</ul>)
	}

	render() {
		const applicant = this.props.applicant;
		const applicantAddress = `${applicant.city}, ${applicant.state}, ${applicant.zip}`;
		const applicantEmail = this.props.applicant.email;
		const applicantPhone = this.props.applicant.cellPhone;
		const applicantResume = this.props.applicant.resume;

		return (
			<div className={'applicant-info-component'}>
				<div className={'applicant-info'}>
					<div className={'applicant-details'}>
						<h1>{applicant.firstName} {applicant.lastName}</h1>
						<p>{applicantAddress}</p>
						<p>{applicantPhone}</p>
						<p>{applicantEmail}</p>
						{this.createSocialLinks()}
					</div>
					<div className={'applicant-status'}>
						<h1>Status:</h1>
						<select name="status" id="status">
							<option value="reviewed">Reviewed</option>
							<option value="reviewed">Needs Review</option>
						</select>
						<h1>Interest:</h1>
						<select name="interest" id="interest">
							<option value="interested">interested</option>
							<option value="maybe">maybe</option>
							<option value="no-interest">no interest</option>
						</select>
					</div>
					<div className={'applicant-links'}>
						<button className={'btn-standard'}>View Resume</button>
						<button className={'btn-standard'}>View Cover Letter</button>
						<button className={'btn-standard'}>Download</button>
					</div>
				</div>
				{applicantResume !== null ? <div dangerouslySetInnerHTML={{__html: applicantResume}}>
				</div> : <div>Click to view resume</div>}

			</div>
		)
	}
}

export default ApplicantInfoComponent;