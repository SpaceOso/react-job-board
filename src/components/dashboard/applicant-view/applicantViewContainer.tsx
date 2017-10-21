import * as React from 'react';
import {Applicants} from "../../../types/index";
import SpinnerComponent from "../../spinners/spinnerComponent";
import ApplicantInfoComponent from "./applicant-info/applicantInfoComponent";

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
			<div>
				I'm the applicant view container

				{this.props.applicant !== null ? <ApplicantInfoComponent applicant={this.props.applicant} /> : <SpinnerComponent />}
			</div>
		)
	}
}

export default ApplicantViewContainer;