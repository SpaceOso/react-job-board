import * as React from 'react';
import {Switch, Route} from 'react-router-dom';

//components
import UserDashboardNavMenu from "../nav-menu/userDashboardNavMenu";
import CreateJobComponent from '../jobs/createJob/createJobComponent';
//styles
import ApplicantListComponent from "../applicant-list/applicantListComponent";
import {Employer, SiteFetching, User} from "../../../types/index";
import {RouteComponentProps} from "react-router";
// import EditJobsContainer from '../../dashboard/jobs/editJob/editJobsContainer';
import "./styles/mainLyout.scss";
import EditJobsLayout from "../jobs/editJob/editJobsLayout";

interface Props extends RouteComponentProps<any> {
	user: User,
	employer: Employer,
	siteFetching: SiteFetching,
	saveJobPost: (jobInfo, userId) => {}
}

class DashboardMainLayout extends React.Component<Props, any> {
	render() {
		console.log("in the mainlayout component with:", this.props.match);
		return (
			<div className="layout-container">
				<UserDashboardNavMenu match={this.props.match}/>
				<div className="dashboard-content">
					<Switch>
						{/*CREATE JOB COMPONENT*/}
						<Route path={`${this.props.match.url}/createjob`}
						       render={props =>
							       (<CreateJobComponent
									       userId={this.props.user._id}
									       employer={this.props.employer}
									       siteFetching={this.props.siteFetching}
									       submitJobPost={this.props.saveJobPost}/>
							       )}/>

						{/*EDIT POSTINGS COMPONENT*/}
						{/*component={ () => <EditJobsLayout
								       employer={this.props.employer}
								       jobs={this.props.employer.jobs}
								       {...this.props}
							       />
						       } />*/}
						<Route path={`${this.props.match.path}/editpostings`}
						     render={(RouteComponentProps) => (
							       <EditJobsLayout
								       employer={this.props.employer}
								       jobs={this.props.employer.jobs}
								       {...RouteComponentProps}
							       />
						       )}
						/>
						{/*APPLICANT LIST COMPONENT*/}
						<Route path={`${this.props.match.path}`}
						       render={props =>
							       (<ApplicantListComponent
									       user={this.props.user}
									       employer={this.props.employer}/>
							       )}/>
					</Switch>
				</div>
			</div>
		)
	}
}

export default DashboardMainLayout;