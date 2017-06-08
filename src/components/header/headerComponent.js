import React from 'react';
import {Link} from 'react-router-dom';


export const HeaderComponent = (props) => {
	return (
		
		<div className="header-component">
			<Link to="/">
				<div id="header-logo">
					<h1>Job Board</h1>
				</div>
			</Link>
			
			<Link to={"/user"}>
				<div className="nav-item">
					Job Seeker
				</div>
			</Link>
			
			<Link to={"/employer"}>
				<div className="nav-item">
					Employers
				</div>
			</Link>
			<Link to={"/login"}>
				<div className="nav-item">
					Log In
				</div>
			</Link>
		</div>
	)
};