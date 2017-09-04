import * as React from 'react';
import {Employer, User} from "../../../types/index";
import {IMG_URL} from "../../../utils/utils";

interface MyProps{
	user: User,
	employer: Employer
}

class ApplicantListComponent extends React.Component<MyProps>{
	render(){
		return(
			<div>
				<h1>Welcome {this.props.user.firstName}!!</h1>
				<img src={`${IMG_URL}${this.props.employer.logoImg}`} alt=""/>
				<h3>This should be displayed in the home page of the dashboard</h3>
				<h1>Click to view info on applicants of {this.props.employer.name}</h1>
			</div>
		)
	}
}

export default ApplicantListComponent;