import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

//component
import UserRegisterComponent from './userRegisterComponent';

//actions
import {registerUser} from '../../actions/authActions';

//styles
import './styles/userRegister.scss';
import {StoreState} from "../../types/index";

function mapStateToProps({user}): StoreState{
	return {
		user
	}
}

const mapDispatchToProps = (dispatch) =>({
	registerUser: (dispatch, user) => dispatch(registerUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterComponent);