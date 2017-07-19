import * as React from 'react';
import {Employer, User} from "../../../types/index";

interface MyProps{
	user: User,
	employer: Employer
}

class ApplicantListComponent extends React.Component<MyProps>{
	render(){
		return(
			<div>
				<h1>Welcome {this.props.user.firstName}!!</h1>
				<h1>Click to view info on applicants of {this.props.employer.name}</h1>
			</div>
		)
	}
}

export default ApplicantListComponent;