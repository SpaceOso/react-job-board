import * as React from 'react';
import {Link, NavLink} from "react-router-dom";

//styles
import "./UserDashboardNavMenu.scss";
import {RouteComponentProps} from "react-router";
import {LOCAL_URL} from "../../../utils/utils";

interface MyProps {
	match
}

class UserDashboardNavMenu extends React.Component<MyProps>{
	render(){
		return(
			<div className="user-dashboard-nav">
				<NavLink className="user-dashboard-btn" to={`${this.props.match.url}/home`} activeClassName={'selected'}>
					<img src={`${LOCAL_URL}${require('../../../assets/images/icon-home.svg')}`} />Home
				</NavLink>
				<NavLink className="user-dashboard-btn" activeClassName={'selected'} to={`${this.props.match.url}/applicants`}>
					<img src={`${LOCAL_URL}${require('../../../assets/images/icon-applicant-stack.svg')}`} />Applicants
				</NavLink>
				<NavLink className="user-dashboard-btn" activeClassName={'selected'} to={`${this.props.match.url}/createjob`}>
					<img src={`${LOCAL_URL}${require('../../../assets/images/icon-job-posts.svg')}`} />Post A Job
				</NavLink>
				<NavLink className="user-dashboard-btn" activeClassName={'selected'} to={`${this.props.match.url}/editpostings`}>
					<img src={`${LOCAL_URL}${require('../../../assets/images/icon-edit-posts.svg')}`} />Edit Postings
				</NavLink>
				<NavLink className="user-dashboard-btn" activeClassName={'selected'} to={`${this.props.match.url}/profile`}>
					<img src={`${LOCAL_URL}${require('../../../assets/images/icon-profile-page.svg')}`} />Profile / Edit
				</NavLink>
			</div>
		)
	}
}

export default UserDashboardNavMenu;