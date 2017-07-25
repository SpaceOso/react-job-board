import React from 'react';
import { Switch, Route} from 'react-router-dom';

//components
import UserDashboardNavMenu from "../nav-menu/userDashboardNavMenu";
import CreateJobComponent from '../jobs/createJob/createJobComponent';
//styles
import "./styles/mainLyout.scss";
import ApplicantListComponent from "../applicant-list/applicantListComponent";

class MainLayout extends React.Component {
	render() {
		console.log("in the mainlayout component with:", this.props.user);
		return (
			<div className="dashboard-main-layout">
				<UserDashboardNavMenu match={this.props.match}/>
				
				<div className="layout-container">
					<Switch>
						<Route path={`${this.props.match.path}/createjob`} render={props => (<CreateJobComponent userId={this.props.user.userId} employer={this.props.employer} {...props}/>)}/>
						<Route path={`${this.props.match.path}`} render={props => (<ApplicantListComponent user={this.props.user} employer={this.props.employer}/>)}/>
					</Switch>
				</div>
			</div>
		)
	}
}

export default MainLayout;