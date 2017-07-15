import * as React from 'react';
import {Employer, User} from "../../../types/index";
import {RouteComponentProps} from "react-router";
//redux
interface Props extends RouteComponentProps<any>{
	user: User,
	employer: Employer,
	fetchThisUserInfo,
	submitJobPost,
	submitEmployerRegistration
}

class TestDashboard extends React.Component<Props, any> {
	constructor(props){
		super(props);

		console.log("inside the test dashboard with props...", this.props);
		console.log("this.props.match...", this.props.match);
	}
	render() {
		return (
			<div>
				I'm the TestDashboard comp;
			</div>
		)

	}
}

export default TestDashboard;