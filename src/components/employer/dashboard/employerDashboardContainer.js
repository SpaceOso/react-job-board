import React from 'react';
import EmployerDashboardComponent from './employerDashboardComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getJobById} from '../../../actions/jobActions';


class EmployerDashboardContainer extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				I'm the employer Dashboard container... here's the info
				<EmployerDashboardComponent/>
			</div>
		)
	}
};

function mapStateToProps(state) {
    return {user: state.user}
}

function mapDsipatchToProps(dispatch) {
    return bindActionCreators({getJobById}, dispatch);
}

export default connect(mapStateToProps, mapDsipatchToProps)(EmployerDashboardContainer);