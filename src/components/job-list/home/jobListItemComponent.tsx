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
			<Link className="link-container" to={`/jobposts/${job._id}`}>
				{/*LOGO*/}
				<div className="job-list-logo">
					<img src={job.employerLogo ?
						`${IMG_URL}${job.employerLogo}` : require('../../../assets/images/no-icon.svg')}
					/>
				</div>
				{/*JOB INFORMATION*/}
				<div className="job-info">
					<h1 className="job-title">
						{job.jobTitle}
					</h1>
					<p className="job-employer">
						{job.employerName}
					</p>
				</div>
				<div className="post-info">
					<p className="post-date">{job.updatedAt}</p>
					<p className="post-location">{`${job.employerId.location.city},${job.employerId.location.state}`}</p>
				</div>
				{/*<p className="job-description" dangerouslySetInnerHTML={{__html: job.jobDescription}}></p>*/}
			</Link>
		</div>
	)
};

export default JobListItem;