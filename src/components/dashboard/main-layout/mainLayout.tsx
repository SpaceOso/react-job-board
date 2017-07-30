import * as React from 'react';
import { Switch, Route} from 'react-router-dom';

//components
import UserDashboardNavMenu from "../nav-menu/userDashboardNavMenu";
import CreateJobComponent from '../jobs/createJob/createJobComponent';
//styles
import "./styles/mainLyout.scss";
import ApplicantListComponent from "../applicant-list/applicantListComponent";
import {Employer, SiteFetching, User} from "../../../types/index";
import {RouteComponentProps} from "react-router";

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
			<div className="dashboard-main-layout">
				<UserDashboardNavMenu match={this.props.match}/>
				
				<div className="layout-container">
					<Switch>
						<Route path={`${this.props.match.path}/createjob`}
						       render={props =>
							       (<CreateJobComponent
								       userId={this.props.user._id}
								       employer={this.props.employer}
								       siteFetching={this.props.siteFetching}
								       submitJobPost={this.props.saveJobPost}/>
							       )}/>
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