import React from 'react';


import {BrowserRouter, Route, Link, Switch, HashRouter} from 'react-router-dom';

import {EmployerComponent} from './employerComponent';
import LayoutComponent from './layoutComponent';
import {UserComponent} from './userComponent';
import JobListContainer from '../containers/jobListContainer';


class App extends React.Component{
    render(){
        return (
            <HashRouter>
                <div>
                    <p><Link to="/user">Click me!</Link></p>
                    <JobListContainer/>
                    <LayoutComponent >
                        <Switch>
                            <Route exact path="/" component={EmployerComponent}/>
                            <Route path="/user" component={UserComponent}/>
                            {/*<EmployerComponent/>*/}
                            {/*<h2>I'm between the header and footer...</h2>*/}
                        </Switch>
                    </LayoutComponent>
                </div>
            </HashRouter>
        )
    }
}

export default App;