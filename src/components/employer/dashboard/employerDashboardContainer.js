import React from 'react';
import EmployerDashboardComponent from './employerDashboardComponent';

class EmployerDashboardContainer extends React.Component{
	render(){
		return (
			<div>
				I'm the employer Dashboard container... here's the info
				<EmployerDashboardComponent/>
			</div>
		)
	}
};

export default EmployerDashboardContainer;