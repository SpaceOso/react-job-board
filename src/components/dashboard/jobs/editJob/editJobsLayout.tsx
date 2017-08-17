import * as React from 'react';
import DataTable from "../../../data-table/dataTable";
import {Job} from "../../../../types/index";
import EditJobComponent from "./editJobComponent";

interface MyProps{
	jobs,
	employer,
	fetchAllEmployerJobModels,
}

interface myState{
	selectedJob: Job | null
}

class EditJobsLayout extends React.Component<MyProps, myState>{
	constructor(props){
		super(props);

		this.state = {
			selectedJob: null,
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick(selectedJob){
		this.setState({selectedJob});
	}

	render(){
		const dataInfo = [
			{property: 'jobTitle', header:'Job Title'},
			{property: 'jobDescription', header:'Job Description'},
		];

		return(
			<div>
				<h1>Click on the following job posts to edit them.</h1>
				<DataTable
					rowData={this.props.employer.jobs}
					columnInfo={dataInfo}
					handleClick={this.onClick}
					totalRows={10}
				/>
				{/*<div>{this.displayJobList()}</div>*/}

				{this.state.selectedJob !== null ? <EditJobComponent job={this.state.selectedJob}/>: null}


				{/* We will need to edit the title of the jobs.
				 the description of the job.
				 the keywords of the job and be able to delete the job.*/}
			</div>
		)
	}
}

export default EditJobsLayout;