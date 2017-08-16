import * as React from 'react';
import {Employer, SiteFetching, User} from "../../types/index";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";
import SpinnerComponent from "../spinners/spinnerComponent";
import CompRegisterComponent from "./compRegister/compRegisterComponent";
import NotFoundComponent from "../not-found/notFoundComponent";
import {default as DashboardMainLayout} from "./main-layout/mainLayout";


//redux
interface Props extends RouteComponentProps<any> {
	user: User,
	employer: Employer,
	siteFetching: SiteFetching,
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

class UserDashboardComponent extends React.Component<Props, any> {
	constructor(props) {
		super(props);

		// this.checkForLogInErrors = this.checkForLogInErrors.bind(this);
		this.handleEmployerRegistration = this.handleEmployerRegistration.bind(this);
		this.checkForEmployer = this.checkForEmployer.bind(this);
		this.submitJobPost = this.submitJobPost.bind(this);

		console.log("inside the dashboard component with employer: ", this.props.employer);
	}

	/*If the user doesn't have an ID we need them to login again.*/
	checkForLogInErrors() {
		return this.props.user._id === null || this.props.user._id === undefined || this.props.user === undefined ?
			<Redirect to={'/login'}/> : null;
	}

	handleEmployerRegistration(employerData) {
		let userData = {employerData, userId: this.props.user._id};
		this.props.submitEmployerRegistration(userData);
	};

	/*This will check to see if the user property has an employer listed.
	 * If it does not we will display the employer registration component.
	 * Otherwise we weill load up the main layout*/
	checkForEmployer() {
		if (this.props.siteFetching.isFetching === false) {
			return this.props.user.employerId === null ? <Redirect to={`${this.props.match.url}/register`}/> :
				<Redirect to={`${this.props.match.url}/home`} push/>;
		}
	}

	/* This will handle sending the job post information to the back end.*/
	submitJobPost(jobPost) {
		this.props.saveJobPost(jobPost, this.props.user._id);
	}

	render() {
		let login: any = null;

		if (this.props.siteFetching.isFetching === true) {
			return <SpinnerComponent/>
		}

		if (this.props.user._id === null) {
			login = <Redirect to={'/login'}/>;
		} else {
			login = this.checkForEmployer();
		}

		return (
			<div className="jb-dashboard">
				<Switch>
					{/*REGISTER COMPONENT*/}
					<Route path={`${this.props.match.path}/register`}
					       render={(props) => (
						       <CompRegisterComponent
							       submitData={this.handleEmployerRegistration}
							       user={this.props.user}
							       {...props}
						       />
					       )}
					/>
					{/*DASHBOARD MAIN LAYOUT*/}
					<Route path={`${this.props.match.path}/home`}
					       render={props => (
						       <DashboardMainLayout
							       user={this.props.user}
							       employer={this.props.employer}
							       siteFetching={this.props.siteFetching}
							       saveJobPost={this.props.saveJobPost}
							       {...props}
						       />)
					       }
					/>
					<NotFoundComponent/>
				</Switch>
				{login}
			</div>
		)
	}
}
;

export default UserDashboardComponent;
