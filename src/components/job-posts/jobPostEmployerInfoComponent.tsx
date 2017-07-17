import * as React from 'react';

import {Link} from 'react-router-dom'


import "./styles/jobPostEmployerInfo.scss";
import {Employer} from "../../types/index";

interface MyProps{
	employer,
	loadJob: (arg:any) =>(any)
}

class JobPostEmployerInfoComponent extends React.Component<MyProps, any>{
	constructor(props){
		super(props);

		console.log("job post employer:", this.props.employer);
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
		this.props.loadJob(jobId);
	}

	render(){
		console.log("jobPostEmployer", this.props.employer);
		let employer:Employer = this.props.employer;
		console.log("inside jobpost employer info:", employer);
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