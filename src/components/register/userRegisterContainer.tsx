import * as React from 'react';
import {connect} from 'react-redux';

//component
import UserRegisterComponent from './userRegisterComponent';

//actions
import {registerUser} from '../../actions/authActions';

//styles
import './styles/userRegister.scss';
import {StoreState, User} from "../../types/index";

function mapStateToProps({user, siteFetching}: StoreState){
	return {
		user,
		siteFetching
	}
}

const mapDispatchToProps = (dispatch) =>({
	registerUser: (user:User) => dispatch(registerUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterComponent);