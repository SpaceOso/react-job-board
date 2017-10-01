import * as React from 'react';

//components
import SpinnerComponent from '../spinners/spinnerComponent';
import {Job} from "../../types/index";
import ModalComponent from "../modal/modalComponent";

interface jobPostInfoProps {
	isFetching: boolean,
	job: Job
}


class JobPostInfoComponent extends React.Component<jobPostInfoProps, any> {
	constructor(props) {
		super(props);

		this.dataReady = this.dataReady.bind(this);
	}

	dataReady = () => this.props.isFetching !== true;

	render() {
		console.log("jobPostInfoComponent job:", this.props.job);
		if (this.props.isFetching) {
			return <SpinnerComponent/>
		} else {
			return (
				<div className="job-post">
					<div className="job-header-container panel-shadow">
						<h1 className="jp-job-header">{this.props.job.title}</h1>
					</div>
					<div className="job-description-container panel-shadow">
						<div className="job-description"
						     dangerouslySetInnerHTML={{__html: this.props.job.description}}></div>

						<button>Apply Now</button>
					</div>
				</div>
			)
		}

	}
}

export default JobPostInfoComponent;