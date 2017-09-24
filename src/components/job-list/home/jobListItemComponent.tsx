import * as React from 'react';
import {Link} from 'react-router-dom';

//styles
import './jobListItem.scss';

//interfaces
import {Job} from "../../../types/index";
import {IMG_URL} from "../../../utils/utils";

export interface Props {
	job: Job
}

export const JobListItem: React.SFC<Props> = (props) => {
	const {job} = props;

	return (
		// LOGO
		<div className="job-list-item panel-shadow">
			<Link className="link-container" to={`/jobposts/${job.id}`}>
				{/*LOGO*/}
				<div className="job-list-logo">
					<img src={job.Employer.logoImg ?
						`${IMG_URL}${job.Employer.logoImg}` : require('../../../assets/images/no-icon.svg')}
					/>
				</div>
				{/*JOB INFORMATION*/}
				<div className="job-info">
					<h1 className="job-title">
						{job.title}
					</h1>
					<p className="job-employer">
						{job.Employer.name}
					</p>
				</div>
				<div className="post-info">
					<p className="post-date">{job.createdAt}</p>
					<p className="post-location">{`${job.Employer.location.city},${job.Employer.location.state}`}</p>
				</div>
				{/*<p className="job-description" dangerouslySetInnerHTML={{__html: job.jobDescription}}></p>*/}
			</Link>
		</div>
	)
};

export default JobListItem;