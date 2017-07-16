import * as React from 'react';
import {connect} from 'react-redux';

//component
import UserRegisterComponent from './userRegisterComponent';

//actions
import {registerUser} from '../../actions/authActions';

//styles
import './styles/userRegister.scss';
import {StoreState, User} from "../../types/index";

function mapStateToProps({user}: StoreState){
	return {user}
}

const mapDispatchToProps = (dispatch) =>({
	registerUser: (user) => dispatch(registerUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterComponent);