import * as React from 'react';
import {Redirect, Route} from "react-router";
import {employerFetching, fetchAllEmployerJobModels} from "../../../actions/employerDashboardActions";
import {store} from "../../../index";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import {setSiteIdle} from "../../../actions/authActions";


function ProtectedComponent({component: Component, isAuth, user, ...rest}) {
	console.log("ProtectedComponent props", rest);
	console.log("ProtectedComponent user", user);
	console.log("ProtectedComponent props", user.id === rest.computedMatch.params.userId);

	return (
		<Route
			{...rest}
			render={
				(props) => isAuth === true && user.id === rest.computedMatch.params.userId
					? <Component {...props} />
					: <Redirect to={{pathname: '/'}}/>}
		/>
	)


};

export default ProtectedComponent;