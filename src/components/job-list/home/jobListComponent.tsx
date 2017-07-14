import * as React from 'react';
import SpinnerComponent from "../../spinners/spinnerComponent";
import JobListItem from "./jobListItemComponent";
import {Job} from "../../../types/index";


export interface Props{
	jobs: Job[],
	returnJobList: () => void,
	getJobs: () => any,
	isFetching: false,
}

class JobListComponent extends React.Component<Props> {
	constructor(props) {
		super(props);

		console.log("The joblistcomponent has the following props..", this.props);
		this.returnJobList = this.returnJobList.bind(this);
		// this.getJobs = this.getJobs.bind(this);
	}

	returnJobList() {
		return (
			Object.keys(this.props.jobs).map((job) => {
				let currentJob = this.props.jobs[job];
				console.log(currentJob);
				return <JobListItem key={currentJob._id + 1} job={currentJob}/>
			})
		)
	}

	componentDidMount() {
		this.props.getJobs();
	}

	render() {
		return (
			<div className="app-container">
				<div className="job-list-container">
					<h1 id="job-post-header">Recent Job Posts</h1>
					{this.props.isFetching ? <SpinnerComponent/> : this.returnJobList()}
				</div>
			</div>
		)
	}
}

export default JobListComponent;