import * as React from 'react';
import DataTable from "../../../data-table/dataTable";
import {Employer, Job} from "../../../../types/index";
import EditJobComponent from "./editJobComponent";

//router
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";


interface MyProps extends RouteComponentProps<any>{
// interface MyProps{
	jobs,
	employer,
	// fetchAllEmployerJobModels,
}

interface myState{
	selectedJob: Job | null,
	editingJob: boolean
}

class EditJobsLayout extends React.Component<MyProps, myState>{
	constructor(props){
		super(props);

		this.state = {
			selectedJob: null,
			editingJob: false
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick(selectedJob){
		this.setState({
			selectedJob,
			editingJob: true
		});

	}

	render(){
		const dataInfo = [
			{property: 'jobTitle', header:'Job Title'},
			{property: 'jobDescription', header:'Job Description'},
		];

		return(
			<div>
				<h1>Click on the following job posts to edit them.</h1>
				{this.state.selectedJob !== null ? <Redirect to={`${this.props.match.path}/editJob`} push={true} /> : null}
			<Switch>
					<Route exact={true} path={`${this.props.match.path}`}
					       render={(props)=>(
						       <DataTable
							       rowData={this.props.employer!.jobs}
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
			</div>
		)
	}
}

export default EditJobsLayout;