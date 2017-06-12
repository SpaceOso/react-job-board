import React from 'react';
import {Link} from 'react-router-dom';


class HeaderComponent extends React.Component {
	constructor(props) {
		super(props);
		
		this.logStatus = this.logStatus.bind(this);
		this.clearStorage = this.clearStorage.bind(this);
	}

	clearStorage(){
		// TODO need to set up an action to also remove the user from the store, the header doesn't know it was removed
		console.log("localstorage has been cleared:");
		localStorage.clear();
	}

	logStatus() {
		let logIn = (
			<Link to={"/login"}>
				<div className="nav-item">
					Log In
				</div>
			</Link>
		);
		
		let logOut = (
			<Link to={"/"} onClick={() => this.clearStorage()}>
				<div className="nav-item">
					Log Out
				</div>
			</Link>
		);
	
		return this.props.user.auth === undefined || this.props.user.auth === false ? logIn : logOut;
	}
	
	render() {
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
				
				{this.logStatus()}
			
			
			</div>
		)
		
	}
}
;

export default HeaderComponent;