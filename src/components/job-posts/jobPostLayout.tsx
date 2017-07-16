import * as React from 'react';
import {Employer, Job} from "../../types/index";
import JobPostInfoComponent from "./jobPostInfoComponent";
import JobPostEmployerInfoComponent from "./jobPostEmployerInfoComponent";
import SpinnerComponent from "../spinners/spinnerComponent";
import {RouteComponentProps} from "react-router";

interface jobPostProps extends RouteComponentProps<any>{
	isFetching: boolean,
	job: Job
	employer: Employer,
	getJobById: (arg)=>{},
	loadJob: () => {},
	resetCurrentJob: ()=>{},
	currentJob
}

class JobPostLayout extends React.Component<jobPostProps, any > {
	constructor(props) {
		super(props);

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

	dataReady = () => this.props.currentJob !== null;


	render() {
		if (!this.dataReady()) {
			console.log("job post data is ready!");
			return <SpinnerComponent/>
		} else {
			console.log("job post data isn't ready yet1");
			return (
				<div>
					<JobPostInfoComponent job={this.props.currentJob} isFetching={this.props.isFetching}/>
					{/*<JobPostEmployerInfoComponent employer={this.props.employer} loadJob={this.props.loadJob}/>*/}
				</div>
			)
		}
	}
}

export default JobPostLayout;