import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchThisUserInfo} from '../../actions/authActions';
import CompRegisterComponent from "./compRegister/compRegisterComponent";
import ApplicantListComponent from "./applicant-list/applicantListComponent";


/*What data are we going to need?
 * jobs
 * applicants
 * CRUD jobs*/

/*How do we know who is logged in?
* Should we pull user info on load?
* or should we check if the user has an employer?
* I think you should check that THEN do a get request to get employer info
* if employer property is not inside then show create/submit job buttons*/

/*What components are you going to need for the dashboard?
* list of the latest applicants
* possibly list of job posts with info like when it was posted, total applicant count
* an applicant at a glance component
* a component to view the applicants resume on click*/


/*need to show a company sign up form before proceeding*/
class UserDashboardContainer extends React.Component{
	constructor(props){
		super(props);

		this.fetchEmployerInfo = this.fetchEmployerInfo.bind(this);
	}

	componentDidMount(){
		this.fetchEmployerInfo();
	}

	//this will fire when we first load into the dashboard
	fetchEmployerInfo(){
		//get the userId from the URL params and send it to the action creator
		let userId = this.props.match.params.userId;
		this.props.fetchThisUserInfo(userId);
	}

	render(){
		return (
			<div>
				You're inside the user dashboard with email {this.props.user.email}
				account type:{this.props.user.accountType}<br/>
				employer: {this.props.user.employer}<br/>
				{(this.props.user.accountType !== "employer" && this.props.user.employer === null) ? <CompRegisterComponent/> : "seems like you're an employer"}
				<ApplicantListComponent/>
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
    return bindActionCreators({fetchThisUserInfo}, dispatch);
}

export default connect(mapStateToProps, mapDsipatchToProps)(UserDashboardContainer);