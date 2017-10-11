import * as React from 'react';

//styles
import './userDashboardHome.scss';

import SpinnerComponent from "../../spinners/spinnerComponent";
import JobPostUpdatesComponent from "../jobs/job-post-updates/jobPostUpdatesComponent";

interface MyProps {
	user,
	employer
}

class UserDashboardHome extends React.Component<MyProps> {
	constructor(props) {
		super(props);
	}

	render() {
		if(this.props.employer.isFeteching === true){
			return <SpinnerComponent />
		}

		return (
			<div className='dashboard-home'>
				<div className='header'>
					<h1>
						Welcome {this.props.user.firstName} - {this.props.employer.name}
					</h1>
					<div>
						Job Post Updates
						<JobPostUpdatesComponent jobs={this.props.employer.jobs}/>
						<div>
							<pre>{JSON.stringify(this.props.employer, null, 2)}</pre>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

export default UserDashboardHome;