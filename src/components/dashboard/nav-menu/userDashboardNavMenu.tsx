import * as React from 'react';
import {Link} from "react-router-dom";

//styles
import "./userDashboardNavMenu.scss";
import {RouteComponentProps} from "react-router";

interface MyProps {
	match
}

class UserDashboardNavMenu extends React.Component<MyProps>{
	render(){
		return(
			<div className="user-dashboard-nav">
				<div className="user-dashboard-btn">
					<Link to={`${this.props.match.url}/createjob`}>
					<p className="btn-text">Post A Job</p>
					</Link>
				</div>
				<div className="user-dashboard-btn">
					<p className="btn-text">Applicants</p>
				</div>
				<div className="user-dashboard-btn">
					<Link to={`${this.props.match.url}/editpostings`}>
						<p className="btn-text">Edit Postings</p>
					</Link>
				</div>
				<div className="user-dashboard-btn">
					<p className="btn-text">Profile/Edit</p>
				</div>
			</div>
		)
	}
}

export default UserDashboardNavMenu;