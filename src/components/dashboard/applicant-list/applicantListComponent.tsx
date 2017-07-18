import * as React from 'react';

interface MyProps{
	user,
	employer
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