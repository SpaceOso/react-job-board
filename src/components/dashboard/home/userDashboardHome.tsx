import * as React from 'react';

//styles
import './userDashboardHome.scss';

interface MyProps {
	user,
	employer
}

class UserDashboardHome extends React.Component<MyProps> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='dashboard-home'>
				<div className='header'>
					<h1>
						Welcome {this.props.employer.name}
					</h1>
				</div>

			</div>
		)
	}
}

export default UserDashboardHome;