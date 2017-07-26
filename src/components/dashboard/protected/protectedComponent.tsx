import * as React from 'react';
import {Redirect, Route} from "react-router";

function ProtectedComponent ({component: Component, isAuth, user, ...rest}) {
	console.log("ProtectedComponent props", rest);
	console.log("ProtectedComponent userId", user);
	console.log("ProtectedComponent props", user._id === rest.computedMatch.params.userId);
	return (
		<Route
			{...rest}
			render={
				(props) => isAuth === true && user._id === rest.computedMatch.params.userId
				? <Component {...props} />
				: <Redirect to={{pathname: '/login'}} />}
		/>
	)
};

export default ProtectedComponent;