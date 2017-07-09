import React from 'react';
import {connect} from 'react-redux';
// import { Switch, Route } from 'react-router'
import {bindActionCreators} from 'redux';
import {Redirect, Switch, Route} from 'react-router-dom';

//actions
import {fetchThisUserInfo} from '../../actions/authActions';
import {submitEmployerRegistration, saveJobPost} from '../../actions/employerDashboardActions';

//styles
import './userDashboardContainer.scss';

//components
import UserDashboardNavMenu from "./nav-menu/userDashboardNavMenu";
import CompRegisterComponent from "./compRegister/compRegisterComponent";
import CreateJobComponent from './jobs/createJob/createJobComponent';
import ApplicantListComponent from './applicant-list/applicantListComponent';

//layouts
import MainLayout from './main-layout/mainLayout';
import EditJobsContainer from "./jobs/editJob/editJobsContainer";


/*What data are we going to need?
 * jobs
 * applicants
 * CRUD jobs*/

/*How do we know who is logged in?
 * Should we pull user info on load?
 * or should we check if the user has an employer?
 * I think you should check that THEN do a get request to get employer info
 * if employer property is not inside then show create/submit job buttons*/

/*What components are you going to need for the dashboard?
 * list of the latest applicants
 * possibly list of job posts with info like when it was posted, total applicant count
 * an applicant at a glance component
 * a component to view the applicants resume on click*/


/*need to show a company sign up form before proceeding*/
class UserDashboardContainer extends React.Component {
	constructor(props) {
		super(props);
		
		this.fetchEmployerInfo = this.fetchEmployerInfo.bind(this);
		this.checkForLogInErrors = this.checkForLogInErrors.bind(this);
		this.handleEmployerRegistration = this.handleEmployerRegistration.bind(this);
		this.checkForEmployer = this.checkForEmployer.bind(this);
		this.submitJobPost = this.submitJobPost.bind(this);
	}
	
	componentDidMount() {
		this.fetchEmployerInfo();
	}
	
	//this will fire when we first load into the dashboard
	fetchEmployerInfo() {
		//get the userId from the URL params and send it to the action creator
		let userId = this.props.user.userId;

		/*TODO I think there is a bug here when you refresh while you are already inside the dashboard*/

		console.log("we are going to call fetchThisUserInfo with userId:", userId);

		this.props.fetchThisUserInfo(userId);
	}
	
	checkForLogInErrors() {
		//TODO probably need to reroute to the login page with an error message displayed
		return this.props.user.authorized === false ? <Redirect to={`${'/login'}`}/> : null;
	}

	handleEmployerRegistration(employerData){
		console.log("inside the userDashboardContainer with", employerData);
		let userData = {employerData, userId: this.props.user.userId};
		this.props.submitEmployerRegistration(userData);
	};
	
	/*This will check to see if the user property has an employer listed.
	* If it does not we will display the employer registration component.
	* Otherwise we weill load up the main layout*/
	
	checkForEmployer(){
		/*Currently only save employer id in this.props.user.employer*/
		return this.props.user.employer === null ? <Redirect to={`${this.props.match.url}/register`}/>
			: <Redirect to={`${this.props.match.url}/home`}/>;
	}

	/* This will handle sending the job post information to the back end.*/
	submitJobPost(jobPost){
		this.props.saveJobPost(jobPost, this.props.user.userId);
		console.log("we are saving a job with this info:", jobPost);
	}
	
	render() {

		return (
			<div className="jb-dashboard">
				{this.checkForLogInErrors()}
				{this.checkForEmployer()}

				{/*NAV MENU*/}
				<Route path={`${this.props.match.path}`}
					   render={props => (
					   		<UserDashboardNavMenu
								match={this.props.match}
							/>)
					   }
				/>
				<div className="layout-container">
					<Switch>
						{/*REGISTER COMPONENT*/}
						<Route path={`${this.props.match.path}/register`}
						       render={() => {
						       	return <CompRegisterComponent
									submitData={this.handleEmployerRegistration}
								/>}
						       }
						/>
						{/*CREATE JOB COMPONENT*/}
						<Route path={`${this.props.match.path}/createjob`}
						       render={props => (
						       		<CreateJobComponent
									   userId={this.props.user.userId}
									   employer={this.props.user.employer}
									   submitJobPost={this.submitJobPost}
									   {...props}
									/>
							   )}
						/>
						{/*EDIT POSTINGS COMPONENT*/}
						<Route path={`${this.props.match.path}/editpostings`}
								render={props =>(
									<EditJobsContainer
										employer={this.props.employer}
										jobs={this.props.employer.jobs}
									/>
								)}
						/>
						{/*APPLICANT LIST COMPONENT*/}
						<Route path={`${this.props.match.path}/home`}
						       render={props => (
						       		<ApplicantListComponent
										user={this.props.user}
										employer={this.props.employer}
									/>
							   )}
						/>
					</Switch>
				</div>
			</div>
		)
	}
};

function mapStateToProps(state) {
	return {
		user: state.user,
		employer: state.employer
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchThisUserInfo,
		submitEmployerRegistration,
		saveJobPost
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardContainer);