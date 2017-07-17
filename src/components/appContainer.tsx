import * as React from 'react';

import {connect, Dispatch} from 'react-redux';

import {UserComponent} from './applicant/userComponent';
import {StoreState} from "../types/index";
import {logInOnLoad, logOutUser} from "../actions/authActions";

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
	logInOnLoad: (token) => dispatch(logInOnLoad(token)),
	logOutUser: ()=> dispatch(logOutUser())
});


function mapStateToProps(state : StoreState){
	return{
		user: state.user,
		employer: state.employer
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
