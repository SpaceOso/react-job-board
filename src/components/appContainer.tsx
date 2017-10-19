import * as React from 'react';

import {connect} from 'react-redux';

import {StoreState} from "../types/index";
import {logInOnLoad, logOutUser} from "../actions/authActions";

import App from './app';

const mapDispatchToProps = (dispatch) =>({
	logInOnLoad: (token) => dispatch(logInOnLoad(token)),
	logOutUser: ()=> dispatch(logOutUser())
});


// function mapStateToProps(state : StoreState){
function mapStateToProps({user, employer, siteErrors, siteFetching} : StoreState){
	return{
		user,
		employer,
		siteFetching,
		siteErrors
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
