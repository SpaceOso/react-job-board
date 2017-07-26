import * as React from 'react';
import {Redirect, Route} from "react-router";

function ProtectedComponent ({component: Component, isAuth, user, ...rest}) {
	console.log("ProtectedComponent props", rest);
	return (
		<Route
			{...rest}
			render={
				(props) => isAuth === true
				? <Component {...props} />
				: <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
		/>
	)
};

export default ProtectedComponent;