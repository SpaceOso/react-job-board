import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

//actions
import {logInOnLoad} from '../actions/authActions';

class App extends React.Component {

    componentDidMount(){
        console.log("APP is now loaded!");
        let token = localStorage.getItem('tkn');
        
        console.log("the token that we found on load:", token);
        if(token){
            console.log("does it work out as true....");
	        this.props.logInOnLoad(token);
        }
        
    }

    render() {
        return (
            <HashRouter>
                <LayoutComponent user={this.props.user}>
                    <Route exact path="/" component={JumboTron}/>
                        <Switch>
                            <Route exact path="/" component={JobListContainer}/>
                            <Route exact path="/employer" component={EmployerComponent}/>
                            <Route exact path="/register" component={UserRegisterComponent}/>
                            <Route path="/jobposts/:jobId" component={JobPostContainer}/>
                            <Route exact path="/user" component={UserComponent}/>
                            <Route path="/login" component={LoginContainer}/>
                            <Route exact path="/user/dashboard/:userId/userhome" component={UserDashboardContainer} />
                            <Route component={NotFoundComponent}/>
                        </Switch>
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

function mapDsipatchToProps(dispatch) {
    return bindActionCreators({logInOnLoad}, dispatch);
}

export default connect(mapStateToProps, mapDsipatchToProps)(App);