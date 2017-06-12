import React from 'react';
import {connect} from 'react-redux';

import {BrowserRouter, Route, Link, Switch, HashRouter} from 'react-router-dom';

import EmployerComponent from './employer/home/employerComponent';
import UserDashboardContainer from './dashboard/userDashboardContainer';
import UserRegisterComponent from './register/userRegisterComponent';
import LayoutComponent from './layoutComponent';
import {UserComponent} from './applicant/userComponent';
import JobListContainer from './job-list/home/jobListContainer';
import {JumboTron} from './home/jumboTron';
import JobPostContainer from './job-posts/jobPostContainer';
import LoginContainer from './log-in/loginContainer';
import NotFoundComponent from './not-found/notFoundComponent';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <LayoutComponent user={this.props.user}>
                    <Route exact path="/" component={JumboTron}/>
                    <div className="app-container">
                        <Switch>
                        <Route exact path="/" component={JobListContainer}/>
                            <Route exact path="/employer" component={EmployerComponent}/>
                            <Route exact path="/register" component={UserRegisterComponent}/>
                            <Route path="/jobposts/:jobId" component={JobPostContainer}/>
                            <Route exact path="/user" component={UserComponent}/>
                            <Route path="/login" component={LoginContainer}/>
                            <Route exact path="/user/dashboard/:id/userhome" component={UserDashboardContainer} />
                            <Route component={NotFoundComponent}/>
                        </Switch>
                    </div>
                </LayoutComponent>
            </HashRouter>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        employer: state.employer
    }
}



export default connect(mapStateToProps, null)(App);