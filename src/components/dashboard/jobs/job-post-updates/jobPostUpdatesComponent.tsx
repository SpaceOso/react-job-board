import * as React from 'react';
import {Job} from "../../../../types/index";
import SpinnerComponent from "../../../spinners/spinnerComponent";

//styles
import './jobPostUpdatesComponent.scss';

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

		if(this.props.jobs.length === 0){
			return this.createEmptyMessageComponent();
		}

		return this.props.jobs.map((job, index) => {
			return <li key={job.id ? job.id : index}>{job.title} - {job.location.city},{job.location.state}</li>
		})
	}

	createEmptyMessageComponent(){
		return(
			<div>
				Once you have jobs you will see them posted here.
			</div>
		)
	}

	render() {
		return (
			<div className={'job-post-updates'}>
				<div>
					{this.createList()}
					{/*<pre>{JSON.stringify(this.props.jobs, null, 2)}</pre>*/}
				</div>
			</div>
		)
	}
}

export default JobPostUpdatesComponent;

