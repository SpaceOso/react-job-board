import * as React from 'react';
import {connect} from 'react-redux';
// import { Switch, Route } from 'react-router'
import {bindActionCreators} from 'redux';
import {Redirect, Switch, Route} from 'react-router-dom';

//actions
import {fetchThisUserInfo} from '../../actions/authActions';
import {submitEmployerRegistration, saveJobPost} from '../../actions/employerDashboardActions';

//styles
import './userDashboardContainer.scss';

//components
import UserDashboardNavMenu from "./nav-menu/userDashboardNavMenu";
import CompRegisterComponent from "./compRegister/compRegisterComponent";
import CreateJobComponent from './jobs/createJob/createJobComponent';
import ApplicantListComponent from './applicant-list/applicantListComponent';

//layouts
import MainLayout from './main-layout/mainLayout';
import EditJobsContainer from "./jobs/editJob/editJobsContainer";
import SpinnerComponent from "../spinners/spinnerComponent";
// import UserDashboardComponent from "./userDashboardComponent";
import {StoreState} from "../../types/index";
import TestDashboard from "./nav-menu/testDashboard";
import UserDashboardComponent from "./userDashboardComponent";


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

function mapStateToProps({user, employer}: StoreState, {...props} ) {
	return {
		user,
		employer,
		...props
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchThisUserInfo: () =>{},
	submitJobPost: () =>{},
	submitEmployerRegistration: () =>{},
	saveJobPost: () =>{}
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardComponent);