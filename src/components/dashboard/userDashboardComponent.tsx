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
interface Props extends RouteComponentProps<any>{
	user: User,
	employer: Employer,
	fetchThisUserInfo,
	submitJobPost,
	saveJobPost,
	submitEmployerRegistration
}



class UserDashboardComponent extends React.Component<Props> {
	constructor(props) {
		super(props);

		this.fetchEmployerInfo = this.fetchEmployerInfo.bind(this);
		this.checkForLogInErrors = this.checkForLogInErrors.bind(this);
		this.handleEmployerRegistration = this.handleEmployerRegistration.bind(this);
		this.checkForEmployer = this.checkForEmployer.bind(this);
		this.submitJobPost = this.submitJobPost.bind(this);
		this.waitForLoad = this.waitForLoad.bind(this);

		// this.fetchEmployerInfo();
	}

	componentDidMount() {
		this.fetchEmployerInfo();
	}

	//this will fire when we first load into the dashboard
	fetchEmployerInfo() {
		//get the userId from the URL params and send it to the action creator
		let userId = this.props.user._id;

		/*TODO I think there is a bug here when you refresh while you are already inside the dashboard*/

		console.log("we are going to call fetchThisUserInfo with userId:", userId);

		this.props.fetchThisUserInfo(userId);
	}

	checkForLogInErrors() {
		//TODO probably need to reroute to the login page with an error message displayed
		return this.props.user.isAuth === false ? <Redirect to={`${'/login'}`}/> : null;
	}

	handleEmployerRegistration(employerData){
		console.log("inside the userDashboardContainer with", employerData);
		let userData = {employerData, userId: this.props.user._id};
		this.props.submitEmployerRegistration(userData);
	};

	/*This will check to see if the user property has an employer listed.
	 * If it does not we will display the employer registration component.
	 * Otherwise we weill load up the main layout*/

	checkForEmployer(){
		/*Currently only save employer id in this.props.user.employer*/
		return this.props.user.employerId === null ? <Redirect to={`${this.props.match.url}/register`}/>
			: <Redirect to={`${this.props.match.url}/home`}/>;
	}

	/* This will handle sending the job post information to the back end.*/
	submitJobPost(jobPost){
		this.props.saveJobPost(jobPost, this.props.user._id);
		console.log("we are saving a job with this info:", jobPost);
	}

	/*Will show spinner as we gather the user information for the dashboard*/
	waitForLoad(){
		console.log("waitForLoad userId", typeof this.props.user);
		if(this.props.user === null || this.props.user === undefined){
			console.log("should be showing spinner...");
			return <SpinnerComponent/>
		} else {
			console.log("should be showing the switch..");
			return (
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
							       userId={this.props.user._id}
							       employer={this.props.user.employerId}
							       submitJobPost={this.submitJobPost}
							       {...props}
						       />
					       )}
					/>
					{/*EDIT POSTINGS COMPONENT*/}
					<Route path={`${this.props.match.path}/editpostings`}
					       render={props =>(
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
			)
		}
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
					{/*Removed switch component form here*/}
					{this.waitForLoad()}
				</div>
			</div>
		)
	}
};

export default UserDashboardComponent;
