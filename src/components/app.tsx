import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import UserDashboardContainer from './dashboard/userDashboardContainer';
import UserRegisterContainer from './register/userRegisterContainer';
import LayoutComponent from './layoutComponent';
import UserComponent from './applicant/userComponent';
import JobListContainer from './job-list/home/jobListContainer';
import {JumboTron} from './home/jumboTron';
import JobPostContainer from './job-posts/jobPostContainer';
import LoginContainer from './log-in/loginContainer';
import NotFoundComponent from './not-found/notFoundComponent';

//actions
import {Employer, SiteErrors, User} from "../types/index";
import {logInOnLoad} from "../actions/authActions";
import ProtectedComponent from "./dashboard/protected/protectedComponent";
import TestComponent from "./tests/testComponent";

interface Props {
	logInOnLoad,
	logOutUser: () => {},
	user: User,
	employer: Employer,
	siteErrors: SiteErrors
}

class App extends React.Component<Props> {
	constructor(props) {
		super(props);

		this.checkReload = this.checkReload.bind(this);

		this.checkReload();
	}

	checkReload() {
		let token = localStorage.getItem('tkn');

		if (token !== undefined) {
			this.props.logInOnLoad(token);
		}
	}

	render() {
		return (
			<BrowserRouter>
				<LayoutComponent user={this.props.user} logOutUser={this.props.logOutUser}>
					{/*<Route exact path="/" component={JumboTron}/>*/}
					<Switch>
						<Route exact path="/" component={JobListContainer as any}/>
						<Route exact path="/register" component={UserRegisterContainer as any}/>
						<Route exact path="/jobposts/:jobId" component={JobPostContainer as any}/>
						<Route exact path="/jobseeker" component={UserComponent}/>
						<Route exact path="/login" component={LoginContainer as any}/>
						<Route exact path="/test" component={TestComponent}/>
						<ProtectedComponent path="/user/dashboard/:userId" component={UserDashboardContainer}
						                    isAuth={this.props.user.isAuth} user={this.props.user}/>
						<Route component={NotFoundComponent}/>
					</Switch>
				</LayoutComponent>
			</BrowserRouter>
		)
	}
}

export default App;


