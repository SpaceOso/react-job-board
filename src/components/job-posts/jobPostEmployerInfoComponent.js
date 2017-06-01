import React from 'react';

import {Link, Redirect} from 'react-router-dom'


import "./jobPostEmployerInfo.scss";

class JobPostEmployerInfoComponent extends React.Component{
	constructor(props){
		super(props);
		console.log("JobPostEmployer:", this.props);
		
		this.handleClick = this.handleClick.bind(this);
	}

	createJobList(){
		/*Need to create a ul with links of the other jobs offered by this employer.
		* They need to navigate to /jobposts/:jobId.
		* They should not include the job you're currently on.
		* Need to figure out if we need another component for this section or not*/
		let employer = this.props.employer;
		
		return employer.jobs.map(job =>
			<Link  to={`/jobposts/${job._id}`} key={`${job.jobTitle}${new Date()}`} onClick={() => {this.handleClick(job._id)}}>
				<li >{job.jobTitle}</li>
			</Link>
		)
	}
	
	handleClick(jobId){
		console.log("we've been clicked..", jobId);
		this.props.loadJob(jobId);
	}

	render(){
		let employer = this.props.employer;
		return (
			<aside className="jp-employer-aside">
				<img src={employer.logoImg} alt={`${employer.name} logo`}/>
				<h1 className="title">About {employer.name}</h1>
				<p className="jp-employer-location">{`${employer.location.city},${employer.location.state}`}</p>
				<div>Social media icons go here</div>
				<div>
					<h1 className="title">Other jobs by {employer.name}</h1>
					<ul className="other-job-ul">
						{this.createJobList()}
					</ul>
				</div>
			</aside>
		)
	}
}

export default JobPostEmployerInfoComponent;