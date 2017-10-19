import * as React from 'react';
import {Applicants} from "../../../types/index";

interface MyProps{
	applicant: Applicants | null
}


class ApplicantViewComponent extends React.Component<MyProps>{
	constructor(props){
		super(props);

	}

	render(){
		return(
			<div>
				I'm the applicant view component;

				{this.props.applicant !== null ? this.props.applicant.firstName : null}

			</div>
		)
	}
}

export default ApplicantViewComponent;