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
import UserDashboardHome from "../home/userDashboardHome";
import ApplicantViewComponent from "../applicant-view/applicantViewComponent";

interface Props extends RouteComponentProps<any> {
	user: User,
	employer: Employer,
	saveJobPost: (jobInfo, userId) => {}
}

class DashboardMainLayout extends React.Component<Props, any> {
	render() {
		return (
			<div className="dashboard-layout">

				<UserDashboardNavMenu match={this.props.match}/>
				{/*<div className="dashboard-content">*/}
				<Switch>
					{/*CREATE JOB COMPONENT*/}
					<Route path={`${this.props.match.url}/createjob`}
					       render={props =>
						       (<CreateJobComponent
								       userId={this.props.user.id}
								       employer={this.props.employer}
								       submitJobPost={this.props.saveJobPost}/>
						       )}/>
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
					<Route path={`${this.props.match.path}/applicants/:applicantId`}
					       render={props =>
						       (<ApplicantViewComponent/>)}/>
					{/*APPLICANT LIST COMPONENT*/}
					<Route path={`${this.props.match.path}/applicants`}
					       render={props =>
						       (<ApplicantListComponent
								       {...props}
								       user={this.props.user}
								       employer={this.props.employer}/>
						       )}/>
					{/*APPLICANT LIST COMPONENT*/}
					<Route path={`${this.props.match.path}`}
					       render={props =>
						       (<UserDashboardHome
								       user={this.props.user}
								       employer={this.props.employer}/>
						       )}/>
				</Switch>
			</div>
			// </div>
		)
	}
}

export default DashboardMainLayout;