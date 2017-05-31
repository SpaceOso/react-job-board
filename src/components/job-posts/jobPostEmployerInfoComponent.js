import React from 'react';

import "./jobPostEmployerInfo.scss";

class JobPostEmployerInfoComponent extends React.Component{
	constructor(props){
		super(props);
		console.log("JobPostEmployer:", this.props);
	}

	createJobList(){
		/*Need to create a ul with links of the other jobs offered by this employer.
		* They need to navigate to /jobposts/:jobId.
		* They should not include the job you're currently on.
		* Need to figure out if we need another component for this section or not*/
		let employer = this.props.employer;

		return employer.jobs.map(job => <li key={`${job.jobTitle}${new Date()}`}>{job.jobTitle}</li>)
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
					<ul>
						{this.createJobList()}
					</ul>
				</div>
			</aside>
		)
	}
}

export default JobPostEmployerInfoComponent;