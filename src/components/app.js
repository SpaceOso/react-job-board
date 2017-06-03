import React from 'react';


import {BrowserRouter, Route, Link, Switch, HashRouter} from 'react-router-dom';

import EmployerComponent from './employer/home/employerComponent';
import UserRegisterComponent from './register/userRegisterComponent';
import LayoutComponent from './layoutComponent';
import {UserComponent} from './applicant/userComponent';
import JobListContainer from './job-list/home/jobListContainer';
import {JumboTron} from './home/jumboTron';
import JobPostContainer from './job-posts/jobPostContainer';


class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <LayoutComponent >
                    <Route exact path="/" component={JumboTron}/>
                    <div className="app-container">
                        <Route exact path="/" component={JobListContainer}/>
                        <Switch>
                            <Route exact path="/employer" component={EmployerComponent}/>
                            <Route exact path="/register" component={UserRegisterComponent}/>
                            <Route path="/jobposts/:jobId" component={JobPostContainer}/>
                            <Route path="/user" component={UserComponent}/>
                        </Switch>
                    </div>
                </LayoutComponent>
            </HashRouter>
        )
    }
}

export default App;