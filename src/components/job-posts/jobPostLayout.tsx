import * as React from 'react';
import {CurrentJobPost, Employer, Job} from "../../types/index";
import JobPostInfoComponent from "./jobPostInfoComponent";
import JobPostEmployerInfoComponent from "./jobPostEmployerInfoComponent";
import SpinnerComponent from "../spinners/spinnerComponent";
import {RouteComponentProps} from "react-router";

interface jobPostProps extends RouteComponentProps<any> {
	isFetching: boolean,
	// job: Job
	employer: Employer,
	getJobById: (arg) => {},
	loadJob: () => {},
	resetCurrentJob: () => {},
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

		this.state = {
			jobPostEmployerInfo: {
				employerLogo: '',
				employerId: '',
				employerName: ''
			}
		};

		this.dataReady = this.dataReady.bind(this);
		this.loadNewJob = this.loadNewJob.bind(this);
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

	dataReady = () => {

		// this.setState((prevState, props) => {
		// 	return {jobPostEmployerInfo: {
		// 		employerLogo: this.props.job.employerLogo,
		// 		employerId: this.props.job.employerId,
		// 		employerName: this.props.job.employerName
		// 	}}
		// });
		return this.props.isFetching === true;
	};


	render() {

		let employerInfo: any = {
			employerLogo: this.props.currentJobPost.employerLogo,
			employerId: this.props.currentJobPost.employerId,
			employerName: this.props.currentJobPost.employerName
		};

		if (this.dataReady()) {
			return <SpinnerComponent/>
		} else {
			return (
				<div>
					<JobPostInfoComponent job={this.props.currentJobPost} isFetching={this.props.isFetching}/>
					<JobPostEmployerInfoComponent employer={employerInfo} loadJob={this.props.loadJob}/>
				</div>
			)
		}
	}
}

export default JobPostLayout;