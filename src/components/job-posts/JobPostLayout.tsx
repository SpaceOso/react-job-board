import * as React from 'react';
import {CurrentJobPost, Employer, Job} from "../../types/index";
import JobPostInfoComponent from "./JobPostInfoComponent";
import JobPostEmployerInfoComponent from "./JobPostEmployerInfoComponent";
import SpinnerComponent from "../spinners/SpinnerComponent";
import {RouteComponentProps} from "react-router";

//styles
import "./styles/JobPostContainer.scss";

interface jobPostProps extends RouteComponentProps<any> {
	// job: Job
	// employer: Employer,
	getJobById: (arg) => {},
	loadJob: () => {},
	resetCurrentJob: () => {},
	addApplicantToJob: (applicantInfo)=>{},
	currentJobPost: CurrentJobPost
}

interface MyState {
	jobPostEmployerInfo: {
		employerName: string,
		employerLogo: string,
		employerId: string,
	}
}

class JobPostLayout extends React.Component<jobPostProps, MyState> {
	constructor(props) {
		super(props);

		this.loadNewJob = this.loadNewJob.bind(this);
		this.handleJobApplicantInfo = this.handleJobApplicantInfo.bind(this);
	}

	componentDidMount() {
		this.props.getJobById(this.props.match.params.jobId);
	}

	componentWillUnmount() {
		this.props.resetCurrentJob();
	}

	loadNewJob(jobId) {
		this.props.resetCurrentJob();
		this.props.getJobById(jobId);
	}

	handleJobApplicantInfo(data){
		console.log("in the job post layout about to add applicant:", data);
		this.props.addApplicantToJob(data);
	}

	render() {

		console.log("layout, props.currentEmployer", this.props.currentJobPost.Employer);
		if (this.props.currentJobPost.isFetching === undefined || this.props.currentJobPost.isFetching === true) {
			return <SpinnerComponent/>
		}

		if(this.props.currentJobPost.Employer.name !== null)	{
			return (
				<div className="job-post-container">
					<JobPostInfoComponent
						job={this.props.currentJobPost}
						isFetching={this.props.currentJobPost.isFetching}
						addApplicantToJob={this.handleJobApplicantInfo}
					/>
					<JobPostEmployerInfoComponent employer={this.props.currentJobPost.Employer} loadJob={this.loadNewJob}/>
				</div>
			)
		} else {
			return null;
		}
	}
}

export default JobPostLayout;