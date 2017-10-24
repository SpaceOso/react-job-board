import * as React from 'react';
import {Applicants, StoreState} from "../../../types/index";
import SpinnerComponent from "../../spinners/spinnerComponent";
import ApplicantInfoComponent from "./applicant-info/applicantInfoComponent";

import './applicantViewContainer.scss';
import {
	fetchAllEmployerJobModels, saveJobPost,
	submitEmployerRegistration
} from "../../../actions/employerDashboardActions";

interface MyProps{
	applicant: Applicants | null
}

class ApplicantViewContainer extends React.Component<MyProps>{
	constructor(props){
		super(props);

		console.log("applicant view container loaded");
	}

	render(){
		return(
			<div className={'applicant-view-container'}>
				{this.props.applicant !== null ? <ApplicantInfoComponent applicant={this.props.applicant} /> : <SpinnerComponent />}
			</div>
		)
	}
}

// function mapStateToProps({user, employer}: StoreState, {...props} ) {
function mapStateToProps({user, employer, siteFetching}: StoreState ) {
	return {
		user,
		employer,
		siteFetching
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateApplicantInfo: (dispatch) => {dispatch()}
});

export default ApplicantViewContainer;