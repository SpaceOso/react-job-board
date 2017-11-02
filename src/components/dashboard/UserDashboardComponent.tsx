import * as React from 'react';
import {Employer, SiteFetching, User} from "../../types/index";
import { Route, RouteComponentProps, Switch} from "react-router";
import SpinnerComponent from "../spinners/SpinnerComponent";
import CompRegisterComponent from "./compRegister/CompRegisterComponent";
import NotFoundComponent from "../not-found/NotFoundComponent";
import {default as DashboardMainLayout} from "./main-layout/MainLayout";

//redux
interface Props extends RouteComponentProps<any> {
	user: User,
	employer: Employer,
	siteFetching: SiteFetching,
	fetchEmployerJobs: (employerId) => void,
	saveJobPost: (jobInfo, userId) => {}
	submitEmployerRegistration: (userData, file) => {}
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

		this.state = {
			fetching: true
		};

		this.handleEmployerRegistration = this.handleEmployerRegistration.bind(this);
		this.submitJobPost = this.submitJobPost.bind(this);

	}

	componentWillMount(){
		if(this.props.employer.id !== null){
			console.log("we will mount, we are looking up the job posts");
			console.log(this.props);
			this.props.fetchEmployerJobs(this.props.employer.id);
		}
	}

	/**
	 *
	 * @param employerData {Employer} - The employer information from CompRegisterComponent
	 * @param file {File} - The logo of the employer
	 */
	handleEmployerRegistration(employerData, file) {
		let userData = {...employerData, userId: this.props.user.id};
		this.props.submitEmployerRegistration(userData, file);
	};

	/* This will handle sending the job post information to the back end.*/
	submitJobPost(jobPost) {
		this.props.saveJobPost(jobPost, this.props.user.id);
	}

	render() {

		if(this.state.isFetching === true){
			console.log('employer is fetching so showing spinner');
			if(this.props.employer.isFetching !== true){
				this.setState({fetching: false});
			}
			return <SpinnerComponent/>;
		} else {
			console.log("employer is not fetching...");
		}

		return (
			<div className="dashboard-wrapper">
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
					<Route path={`${this.props.match.path}`}
					       render={props => (
						       <DashboardMainLayout
							       user={this.props.user}
							       employer={this.props.employer}
							       saveJobPost={this.props.saveJobPost}
							       {...props}
						       />)
					       }
					/>
					<NotFoundComponent/>
				</Switch>
			</div>
		)
	}
}
;

export default UserDashboardComponent;
