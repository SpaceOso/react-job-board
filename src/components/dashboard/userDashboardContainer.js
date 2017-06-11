import React from 'react';
import UserDashboardComponent from './userDashboardComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getThisEmployerJobs} from '../../actions/employerDashboardActions';
import CompRegisterComponent from "./compRegister/compRegisterComponent";


/*What data are we going to need?
 * jobs
 * applicants
 * CRUD jobs*/

/*How do we know who is logged in?
* Should we pull user info on load?
* or should we check if the user has an employer?
* I think you should check that THEN do a get request to get employer info
* if employer property is not inside then show create/submit job buttons*/


/*need to show a company sign up form before proceeding*/
class UserDashboardContainer extends React.Component{
	constructor(props){
		super(props);

	}

	render(){
		return (
			<div>
				{/*{JSON.stringify(this.props.user)}*/}
				You're inside the user dashboard with email {this.props.user.email}
				account type:{this.props.user.accountType}
				--employer: {this.props.user.employer}
				{(this.props.user.accountType !== "employer" && this.props.user.employer === "null") ? <CompRegisterComponent/> : "seems like you're an employer"}
				<UserDashboardComponent/>
				<button onClick={() => localStorage.clear()}>Reset cookies</button>
			</div>
		)
	}
};

function mapStateToProps(state) {
    return {
    	user: state.user,
    	employer: state.employer
    }
}

function mapDsipatchToProps(dispatch) {
    return bindActionCreators({getThisEmployerJobs}, dispatch);
}

export default connect(mapStateToProps, mapDsipatchToProps)(UserDashboardContainer);