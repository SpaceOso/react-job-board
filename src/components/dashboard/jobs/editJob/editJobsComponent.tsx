import * as React from 'react';
import DataTable from "../../../data-table/dataTable";
import {Job} from "../../../../types/index";

interface MyProps{
	jobs,
	employer,
	fetchAllEmployerJobModels,
}

interface myState{
	selectedJob: Job | null
}

class EditJobsComponent extends React.Component<MyProps, myState>{
	constructor(props){
		super(props);

		this.state = {
			selectedJob: null,

		};

		this.onClick = this.onClick.bind(this);
	}

	onClick(selectedJob){
		console.log("we are in the edit jobs component with selecteds job:", selectedJob);
		this.setState({selectedJob});
	}

	displayJobInformation(){
		if(this.state.selectedJob !== null){
			return(
				<div>
					<h1>{this.state.selectedJob.jobTitle}</h1>
					<h3>{this.state.selectedJob.jobDescription}</h3>
				</div>
			)
		}
	}

	render(){
		const dataInfo = [
			{property: 'jobTitle', header:'Job Title'},
			{property: 'jobDescription', header:'Job Description'},
		];

		return(
			<div>
				<h1>I'm the Edit Jobs Container</h1>
				<DataTable
					rowData={this.props.employer.jobs}
					columnInfo={dataInfo}
					handleClick={this.onClick}
					totalRows={10}
				/>
				{/*<div>{this.displayJobList()}</div>*/}

				{this.state.selectedJob !== null ? this.displayJobInformation() : null}
				{/*TODO we will need a list of jobs that we can edit.
				 We will need to edit the title of the jobs.
				 the description of the job.
				 the keywords of the job and be able to delete the job.*/}
			</div>
		)
	}
}

export default EditJobsComponent;