import * as React from 'react';
import {Job} from "../../../../types/index";
import SpinnerComponent from "../../../spinners/spinnerComponent";

interface IProps {
	jobs: Job[],
}


class JobPostUpdatesComponent extends React.Component<IProps, {}> {

	constructor(props){
		super(props);

		this.createList = this.createList.bind(this);
	}

	createList() {
		if(this.props.jobs === null || this.props.jobs === undefined){
			return(
				<div>
					<SpinnerComponent />
				</div>
			)
		}

		console.log(this.props);
		return this.props.jobs.map((job, index) => {
			return <li key={job.id ? job.id : index}>{job.title}</li>
		})
	}


	render() {
		return (
			<div>
				I'm the job compoent;
				<div>
					{this.createList()}
					LOOK HERE
					<pre>{JSON.stringify(this.props.jobs, null, 2)}</pre>
				</div>
			</div>
		)
	}
}

export default JobPostUpdatesComponent;

