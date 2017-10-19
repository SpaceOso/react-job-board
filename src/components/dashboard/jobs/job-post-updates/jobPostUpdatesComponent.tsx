import * as React from 'react';
import {EmployerJobView, Job} from "../../../../types/index";
import SpinnerComponent from "../../../spinners/spinnerComponent";

//styles
import './jobPostUpdatesComponent.scss';

interface IProps {
	jobs: EmployerJobView[],
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


		if(this.props.jobs.length === 0){
			return this.createEmptyMessageComponent();
		}

		let jobList = this.props.jobs.map((job, index) => {
			return <li key={job.id ? job.id : index} className={'job-update-item'}>
				<h3 className={'job-title'}>{job.title}</h3> - {job.location.city}, {job.location.state}
				<span className={'float-right'}>{job.Applicants.length} applicants</span>
			</li>
		});

		return (<ul className={'job-post-update-list'}>{jobList}</ul>)
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
			<div className={'job-post-updates-container'}>
				<h1>Job Post Updates</h1>
				<div className={'job-post-updates'}>
					{this.createList()}
					{/*<pre>{JSON.stringify(this.props.jobs, null, 2)}</pre>*/}
				</div>
			</div>
		)
	}
}

export default JobPostUpdatesComponent;

