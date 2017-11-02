import * as React from 'react';
import {Applicants, Employer, EmployerJobView, User} from "../../../types/index";
import {IMG_URL} from "../../../utils/utils";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import DataTable from "../../data-table/DataTable";

//styles
import './ApplicantListComponent.scss';
import DropDownComponent from "../../drop-down/DropDownComponent";
import {Redirect, RouteComponentProps} from "react-router";

interface MyProps extends RouteComponentProps<any> {
	user: User,
	jobs: EmployerJobView[] | null,
	employer: Employer,
	handleApplicantSelect: (applicant) => void
}

interface MyState {
	jobs: EmployerJobView[] | null,
	currentJob: EmployerJobView | null,
	applicant: any
}

class ApplicantListComponent extends React.Component<MyProps, MyState> {
	state: MyState = {
		jobs: this.props.jobs,
		currentJob: null,
		applicant: null,
	};

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	componentWillMount() {
		if (this.props.employer.jobs !== null && this.props.employer.jobs.length > 0) {
			//adds the first job to state
			this.setState({currentJob: this.props.employer.jobs[0]})
		}
	}

	createList() {
		const specialClasses = {
			Interested: 'interested',
			'Needs Review': 'needsReview',
			Maybe: 'maybe',
			'No Interest': 'noInterest'
		};

		const dataInfo = [
			{
				join: true,
				property: 'firstName',
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
				join: true,
				properties: ['city', 'state'],
				header: 'Location'
			}
		];

		if (this.state.currentJob === null) {
			return (
				<div>
					Sorry you don't have any jobs to display applicants for.
				</div>
			)
		}

		if (this.state.currentJob.Applicants.length <= 0) {
			return (
				<div>
					Sorry your current job doesn't have any applicants
				</div>
			)
		}

		return (
			<div>
				<h1>Candidates for {this.state.currentJob.title} - {this.state.currentJob.location.city}</h1>
				<DataTable rowData={this.state.currentJob.Applicants}
				           specialClasses={specialClasses}
				           columnInfo={dataInfo}
				           handleClick={this.onClick}
				           totalRows={5}/>
			</div>
		)
	}

	onClick(selectedApplicant) {
		console.log("selectedApplicant", selectedApplicant);
		this.setState({applicant: selectedApplicant});
		this.props.handleApplicantSelect(selectedApplicant);
	}

	render() {


		return (
			<div className={'dashboard-applicant-section'}>
				<DropDownComponent/>
				{this.createList()}
				{this.state.applicant !== null ?
					<Redirect to={`${this.props.match.url}/${this.state.applicant.id}`}/> : null}
			</div>
		)
	}
}

export default ApplicantListComponent;