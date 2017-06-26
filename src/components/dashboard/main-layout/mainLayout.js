import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect, Switch, Route} from 'react-router-dom';

//actions
import {fetchThisUserInfo} from '../../../actions/authActions';
import {submitEmployerRegistration} from '../../../actions/employerDashboardActions';

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
				{console.log("mainlayout props", this.props)}
				{console.log("Double checking..", this.props.match.params)}
				<div className="layout-container">

					<Route path={`${this.props.match.path}/createjob`} render={props => (<CreateJobComponent userId={this.props.user.userId} employer={this.props.employer} {...props}/>)}/>
					<h1>Welcome back {this.props.user.firstName}!!</h1>
					<h1>Click to view info on applicants of {this.props.employer.name}</h1>
					<ApplicantListComponent employer={this.props.employer}/>
				</div>
			</div>
		)
	}
}

export default MainLayout;