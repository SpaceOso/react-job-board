import * as React from 'react';

import {connect, Dispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import {BrowserRouter, Route, Link, Switch, HashRouter} from 'react-router-dom';

import {UserComponent} from './applicant/userComponent';
import {Employer, StoreState, User} from "../types/index";
import {logInOnLoad} from "../actions/authActions";

import App from './app';

// interface Props{
// 	logInOnLoad: (token)=>{},
// 	user: User,
// 	employer: Employer,
// 	checkReload: ()=>{}
// }

// interface DispatchProps{
// 	logInOnLoad: (token) => void;
// }

const mapDispatchToProps = (dispatch) =>({
	logInOnLoad: (token) => dispatch(logInOnLoad(token))
});


function mapStateToProps(state : StoreState){
	return{
		user: state.user,
		employer: state.employer
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
