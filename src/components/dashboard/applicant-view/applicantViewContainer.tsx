import * as React from 'react';
import {Applicants, Employer, SiteFetching, StoreState} from "../../../types/index";
import SpinnerComponent from "../../spinners/spinnerComponent";
import ApplicantInfoComponent from "./applicant-info/applicantInfoComponent";

import './applicantViewContainer.scss';
import {saveApplicantStatus} from "../../../actions/employerDashboardActions";
import {connect} from "react-redux";

interface MyProps {
	applicant: Applicants | null,
	employer: Employer,
	siteFetching: SiteFetching,
	updateApplicantInfo: (applicantInfo) => {};
}

const ApplicantViewContainer: React.SFC<MyProps> = (props) => {
	return (
		<div className={'applicant-view-container'}>
			{props.applicant !== null ?
				<ApplicantInfoComponent
					saveApplicantInfo={props.updateApplicantInfo}
					applicant={props.applicant}/> :
				<SpinnerComponent/>}
		</div>
	)
};

function mapStateToProps({employer, siteFetching}: StoreState) {
	return {
		employer,
		siteFetching
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateApplicantInfo: (applicantInfo) => {
		dispatch(saveApplicantStatus( applicantInfo))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantViewContainer);