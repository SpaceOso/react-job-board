import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserDashboardContainer from './dashboard/UserDashboardContainer';
import JobListContainer from './job-list/home/JobListContainer';
import JobPostContainer from './job-posts/JobPostContainer';
import LayoutComponent from './LayoutComponent';
import LoginContainer from './log-in/LoginContainer';
import NotFoundComponent from './not-found/NotFoundComponent';
import UserRegisterContainer from './register/UserRegisterContainer';

// actions
import { Employer, SiteErrors, SiteFetching, User } from '../types/index';
import ProtectedComponent from './dashboard/protected/ProtectedComponent';
import TestComponent from './tests/TestComponent';

interface Props {
  logInOnLoad;
  logOutUser: () => {};
  user: User;
  employer: Employer;
  siteFetching: SiteFetching;
  siteErrors: SiteErrors;
}

class App extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.checkReload = this.checkReload.bind(this);

    this.checkReload();
  }

  checkReload() {
    const token = localStorage.getItem('tkn');
    console.log('did we find a token:', token);
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
            <Route exact path="/login" component={LoginContainer as any}/>
            <ProtectedComponent
              path="/user/dashboard/:userId"
              component={UserDashboardContainer}
              isAuth={this.props.user.isAuth}
              user={this.props.user}
            />
            <Route component={NotFoundComponent}/>
          </Switch>
        </LayoutComponent>
      </BrowserRouter>
    );
  }
}

export default App;
