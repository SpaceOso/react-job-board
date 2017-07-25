import * as React from 'react';

import {connect} from 'react-redux';

import {UserComponent} from './applicant/userComponent';
import {StoreState} from "../types/index";
import {logInOnLoad, logOutUser} from "../actions/authActions";

import App from './app';

const mapDispatchToProps = (dispatch) =>({
	logInOnLoad: (token) => dispatch(logInOnLoad(token)),
	logOutUser: ()=> dispatch(logOutUser())
});


// function mapStateToProps(state : StoreState){
function mapStateToProps({user, employer} : StoreState){
	return{
		user,
		employer
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
