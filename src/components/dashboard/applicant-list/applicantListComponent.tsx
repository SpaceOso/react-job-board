import * as React from 'react';
import {Applicants, Employer, EmployerJobView, User} from "../../../types/index";
import {IMG_URL} from "../../../utils/utils";
import SpinnerComponent from "../../spinners/spinnerComponent";
import DataTable from "../../data-table/dataTable";

interface MyProps{
	user: User,
	employer: Employer
}

interface MyState{
	jobs: EmployerJobView[],
	applicant: any
}

class ApplicantListComponent extends React.Component<MyProps, MyState>{
	state: MyState = {
		jobs: [],
		applicant: {},
	};

	constructor(props){
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	createList(){
		if(this.props.employer.jobs === null || this.props.employer.jobs === undefined || this.props.employer.jobs.length <= 0){
			return(
				<div>
					Sorry you don't have any jobs to display applicants for.
				</div>
			)
		}

		return(
			<div>
				<h1>Candidates for {this.props.employer.jobs[0].title} - {this.props.employer.jobs[0].location.city}</h1>
				You have jobs but working on displaying applicants right now.
			</div>
		)
	}

	onClick(selectedApplicant){
		console.log("selectedApplicant", selectedApplicant);
		this.setState({applicant: selectedApplicant})
	}

	render(){
		const dataInfo = [
			{
				join: true,
				property:'firstName',
				properties: ['firstName', 'lastName'],
				header: 'First Name'
			},
			{
				property: 'email', header: 'Email'
			},
			{
				join:true,
				properties: ['city', 'state'],
				header: 'Location'
			}
		];

		return(
			<div>
				{this.createList()}
				<DataTable rowData={this.props.employer!.jobs![0].Applicants} columnInfo={dataInfo} handleClick={this.onClick} totalRows={5}/>
				<pre>{JSON.stringify(this.props.employer.jobs, null, 2)}</pre>
			</div>
		)
	}
}

export default ApplicantListComponent;