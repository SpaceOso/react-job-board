import * as React from 'react';
import {Applicants, Employer, EmployerJobView, User} from "../../../types/index";
import {IMG_URL} from "../../../utils/utils";
import SpinnerComponent from "../../spinners/spinnerComponent";
import DataTable from "../../data-table/dataTable";

//styles
import './applicantListComponent.scss';
import DropDownComponent from "../../drop-down/dropDownComponent";
import {Redirect, RouteComponentProps} from "react-router";

interface MyProps extends RouteComponentProps<any>{
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
		applicant: null,
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
		this.setState({applicant: selectedApplicant});
		return (<Redirect to={`${this.props.match.url}/${selectedApplicant.id}`}/>)
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
				property: 'status', header: 'Status'
			},
			{
				property: 'interest', header: 'Interest'
			},
			{
				join:true,
				properties: ['city', 'state'],
				header: 'Location'
			}
		];

		return(
			<div className={'dashboard-applicant-section'}>
				<DropDownComponent/>
				{this.createList()}
				<DataTable rowData={this.props.employer!.jobs![0].Applicants} columnInfo={dataInfo} handleClick={this.onClick} totalRows={5}/>
				<pre>{JSON.stringify(this.props.employer.jobs, null, 2)}</pre>
				}
				{this.state.applicant !== null ? <Redirect to={`${this.props.match.url}/${this.state.applicant.id}`}/> : null }
			</div>
		)
	}
}

export default ApplicantListComponent;