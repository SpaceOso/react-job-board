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
	fetchThisUserInfo: (userId)=>{}
	saveJobPost: (jobInfo, userId)=>{}
	submitEmployerRegistration:(userData)=>{}
}

class UserDashboardComponent extends React.Component<Props> {
	constructor(props) {
		super(props);

		this.checkForLogInErrors = this.checkForLogInErrors.bind(this);
		this.handleEmployerRegistration = this.handleEmployerRegistration.bind(this);
		this.checkForEmployer = this.checkForEmployer.bind(this);
		this.submitJobPost = this.submitJobPost.bind(this);
		this.waitForLoad = this.waitForLoad.bind(this);

		// this.fetchEmployerInfo();
	}

	componentDidMount() {
		// this.fetchEmployerInfo();
		this.checkForLogInErrors();
		this.checkForEmployer();
	}


	checkForLogInErrors() {
		console.log("checkForLogInErrors:", this.props.user.isAuth);
		return this.props.user.isAuth === false ?  <Redirect to={`${'/login'}`} push={true}/> : null;
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
		console.log("checkForEmployer:", this.props.user.employerId === null);
		return this.props.user.employerId === null ? <Redirect to={`${this.props.match.params.userId}/register`}/>
			: <Redirect to={`${this.props.match.params.userId}/home`}/>;
	}

	/* This will handle sending the job post information to the back end.*/
	submitJobPost(jobPost){
		this.props.saveJobPost(jobPost, this.props.user._id);
		console.log("we are saving a job with this info:", jobPost);
	}

	/*Will show spinner as we gather the user information for the dashboard*/
	waitForLoad(){
		if(this.props.user === null || this.props.user === undefined){
			return <SpinnerComponent/>
		} else {
			console.log("inside the dashboard component with route:", this.props.match.params);
			return (
				<Switch>
					{/*REGISTER COMPONENT*/}
					<Route path={`${this.props.match.params.userId}/register`}
					       render={() => {
						       return (<CompRegisterComponent
							       submitData={this.handleEmployerRegistration}
						       />)}
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
