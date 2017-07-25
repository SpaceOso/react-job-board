import * as React from 'react';
import {Route, Switch, HashRouter} from 'react-router-dom';

import EmployerComponent from './employer/home/employerComponent';
import UserDashboardContainer from './dashboard/userDashboardContainer';
import UserRegisterContainer from './register/userRegisterContainer';
import LayoutComponent from './layoutComponent';
import {UserComponent} from './applicant/userComponent';
import JobListContainer from './job-list/home/jobListContainer';
import {JumboTron} from './home/jumboTron';
import JobPostContainer from './job-posts/jobPostContainer';
import LoginContainer from './log-in/loginContainer';
import NotFoundComponent from './not-found/notFoundComponent';

//actions
import {Employer, User} from "../types/index";
import {logInOnLoad} from "../actions/authActions";

interface Props{
    logInOnLoad: (token)=>{},
    logOutUser: ()=>{},
    user: User,
    employer: Employer,
}

class App extends React.Component<Props>{
    constructor(props){
        super(props);

        // console.log("inside the app component, need to check that I do have the right props", this.props);
        this.checkReload = this.checkReload.bind(this);

        this.checkReload();
    }

    checkReload(){
        console.log("inside checkreload....");
        let token = localStorage.getItem('tkn');

        if(token){
            console.log('we found token, loginOnload:', token);
            logInOnLoad(token);
        }
    }

    render() {
        return (
            <HashRouter>
                <LayoutComponent user={this.props.user} logOutUser={this.props.logOutUser}>
                    <Route exact path="/" component={JumboTron}/>
                        <Switch>
                            <Route exact path="/" component={JobListContainer as any}/>
                            <Route exact path="/employer" component={EmployerComponent}/>
                            <Route exact path="/register" component={UserRegisterContainer as any}/>
                            <Route exact path="/jobposts/:jobId" component={JobPostContainer as any}/>
                            <Route exact path="/jobseeker" component={UserComponent}/>
                            <Route exact path="/login" component={LoginContainer as any}/>
                            <Route path="/user/dashboard/:userId" component={UserDashboardContainer as any} />
                            <Route component={NotFoundComponent}/>
                        </Switch>
                </LayoutComponent>
            </HashRouter>
        )
    }
}

export default App;


