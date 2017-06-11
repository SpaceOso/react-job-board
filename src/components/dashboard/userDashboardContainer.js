import React from 'react';
import UserDashboardComponent from './userDashboardComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getThisEmployerJobs} from '../../actions/employerDashboardActions';


/*What data are we going to need?
 * jobs
 * applicants
 * CRUD jobs*/

/*How do we know who is logged in?
* Should we pull user info on load?
* or should we check if the user has an employer?
* I think you should check that THEN do a get request to get employer info
* if employer property is not inside then show create/submit job buttons*/

class UserDashboardContainer extends React.Component{
	constructor(props){
		super(props);

	}

	render(){
		return (
			<div>
				You're inside the user dashboard
				<UserDashboardComponent/>
			</div>
		)
	}
};

function mapStateToProps(state) {
    return {employer: state.employer}
}

function mapDsipatchToProps(dispatch) {
    return bindActionCreators({getThisEmployerJobs}, dispatch);
}

export default connect(mapStateToProps, mapDsipatchToProps)(UserDashboardContainer);