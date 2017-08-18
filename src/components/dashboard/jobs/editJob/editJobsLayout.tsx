import * as React from 'react';
import DataTable from "../../../data-table/dataTable";
import {Job} from "../../../../types/index";
import EditJobComponent from "./editJobComponent";

//router
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";


interface MyProps extends RouteComponentProps<any>{
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
				{this.state.selectedJob !== null ? <Redirect to={`${this.props.match.path}/editJob`} /> : null}
				<Switch>
					<Route path={`${this.props.match.path}`}
					       render={(props)=>(
						       <DataTable
							       rowData={this.props.employer.jobs}
							       columnInfo={dataInfo}
							       handleClick={this.onClick}
							       totalRows={10}
						       />
					       )}
					/>
					<Route path={`${this.props.match.path}/editJob`}
					       render={(state)=>(
						       <EditJobComponent
							       job={this.state.selectedJob}
						       />
					       )}
					       />
				</Switch>

				{/*<div>{this.displayJobList()}</div>*/}

				{/*{this.state.selectedJob !== null ? <EditJobComponent job={this.state.selectedJob}/>: null}*/}


				{/* We will need to edit the title of the jobs.
				 the description of the job.
				 the keywords of the job and be able to delete the job.*/}
			</div>
		)
	}
}

export default EditJobsLayout;