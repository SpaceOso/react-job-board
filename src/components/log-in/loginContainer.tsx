import * as React from 'react';

import {connect} from 'react-redux'

//components
import LoginComponent from './logInComponent';
//styles
import './styles/loginComponent.scss';
import {StoreState} from "../../types/index";
import {logInUser} from "../../actions/authActions";


function mapStateToProps({user}:StoreState) {
	return {
		user
	}
}

const mapDispatchToProps = (dispatch) =>({
	logInUser: (userInfo) =>{dispatch(logInUser(userInfo))}
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);