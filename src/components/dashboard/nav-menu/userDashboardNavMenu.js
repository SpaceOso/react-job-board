import React from 'react';
import {Link} from "react-router-dom";

//styles
import "./userDashboardNavMenu.scss";

class UserDashboardNavMenu extends React.Component{
	render(){
		return(
			<div className="user-dashboard-nav">
				<div className="user-dashboard-btn">
					{console.log("the props...")}
					<Link to={`/user/dashboard/${this.props.match.params.userId}/createjob`}>
					<p className="btn-text">Post A Job</p>
					</Link>
				</div>
				<div className="user-dashboard-btn">
					<p className="btn-text">Applicants</p>
				</div>
				<div className="user-dashboard-btn">
					<p className="btn-text">Edit Postings</p>
				</div>
				<div className="user-dashboard-btn">
					<p className="btn-text">Profile/Edit</p>
				</div>
			</div>
		)
	}
}

export default UserDashboardNavMenu;