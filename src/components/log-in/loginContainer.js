import React from 'react';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux'

//actions
import {logInUser} from '../../actions/authActions';

//components
import LoginComponent from './logInComponent';
//styles
import './styles/loginComponent.scss';

class LoginContainer extends React.Component{
	constructor(props){
		super(props);
		
		this.sendLogInInfo = this.sendLogInInfo.bind(this);
	}
	
	sendLogInInfo(user){
		this.props.logInUser(user);
	}
	
	
	render(){
		return(
			<div className="app-container">
				I'm the loginContainer
				<LoginComponent
					isFetching={this.props.user.isFetching}
					logInUser={this.sendLogInInfo}
					errorMessage={this.props.user.error}/>
				{this.props.user.authorized === true ? <Redirect to={`${'/user/dashboard/'}${this.props.user.userId}`}/> : null}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {user: state.user}
}

function mapDsipatchToProps(dispatch) {
	return bindActionCreators({logInUser}, dispatch);
}

export default connect(mapStateToProps, mapDsipatchToProps)(LoginContainer);