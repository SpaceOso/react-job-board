import * as React from 'react';
import {Employer, User} from "../../types/index";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";
import SpinnerComponent from "../spinners/spinnerComponent";
import CompRegisterComponent from "./compRegister/compRegisterComponent";
import CreateJobComponent from "./jobs/createJob/createJobComponent";
import ApplicantListComponent from "./applicant-list/applicantListComponent";
import EditJobsComponent from "./jobs/editJob/editJobsComponent";
import UserDashboardNavMenu from "./nav-menu/userDashboardNavMenu";
// import EditJobsContainer from './jobs/editJob/editJobsContainer';


//redux
interface Props extends RouteComponentProps<any> {
	user: User,
	employer: Employer,
	fetchThisUserInfo: (userId) => {}
	saveJobPost: (jobInfo, userId) => {}
	submitEmployerRegistration: (userData) => {}
}

/*What is the purpose of this component?
 * Needs to check if the user has a registered employer:
 *   If it does not send us to the register component
 *   If it does send us to the home component
 *How do we check if there is a registered user?
 *   We check this.props.user.employerId
 *   If undefined we send the user to the register component. Else we send them home.
 *Why does it error out sometimes with null user?
 *   I think we need to redirect user out of here first then null out the user in the state.*/

class UserDashboardComponent extends React.Component<Props> {
	constructor(props) {
		super(props);

		this.checkForLogInErrors = this.checkForLogInErrors.bind(this);
		this.handleEmployerRegistration = this.handleEmployerRegistration.bind(this);
		this.checkForEmployer = this.checkForEmployer.bind(this);
		this.submitJobPost = this.submitJobPost.bind(this);
		this.createSwitchRoutes = this.createSwitchRoutes.bind(this);

		// this.fetchEmployerInfo();
	}

	checkForLogInErrors() {
		console.log("checkForLogInErrors:", this.props.user._id === undefined);
		if (this.props.user._id === undefined) {
			console.log("we should be re-routing to the login page then...", this.props.match);
		}
		return this.props.user._id === undefined ? <Redirect to={'/login'}/> : null;
	}

	handleEmployerRegistration(employerData) {
		console.log("Trying to register employer with the following inof:", employerData);
		let userData = {employerData, userId: this.props.user._id};
		this.props.submitEmployerRegistration(userData);
	};

	/*This will check to see if the user property has an employer listed.
	 * If it does not we will display the employer registration component.
	 * Otherwise we weill load up the main layout*/

	checkForEmployer() {
		console.log("checkForEmployer:", this.props.user.employerId);
		console.log("check path wth..", `${this.props.location.pathname}/home`);
		return this.props.user.employerId === null ? <Redirect to={`${this.props.location.pathname}/register`}/>
			: <Redirect to={`${this.props.location.pathname}/home`}/>;
	}

	/* This will handle sending the job post information to the back end.*/
	submitJobPost(jobPost) {
		this.props.saveJobPost(jobPost, this.props.user._id);
		console.log("we are saving a job with this info:", jobPost);
	}

	createSwitchRoutes() {
		return (
			<div className="jb-dashboard">
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
							       return (<CompRegisterComponent
								       submitData={this.handleEmployerRegistration}
							       />)
						       }
						       }
						/>
						{/*CREATE JOB COMPONENT*/}
						<Route path={`${this.props.match.path}/createjob`}
						       render={props => (
							       <CreateJobComponent
								       userId={this.props.user._id}
								       employer={this.props.user.employerId}
								       submitJobPost={this.submitJobPost}
								       {...props}
							       />
						       )}
						/>
						{/*EDIT POSTINGS COMPONENT*/}
						<Route path={`${this.props.match.path}/editpostings`}
						       render={props => (
							       <EditJobsComponent
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

	render() {

		if (this.props.user.isFetching) {
			return <SpinnerComponent/>
		}

		this.checkForLogInErrors();
		this.checkForEmployer();
		this.createSwitchRoutes();
	}
}
;

export default UserDashboardComponent;
