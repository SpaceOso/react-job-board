import * as React from 'react';
import {Link} from 'react-router-dom';

//actions
import {User} from "../../types/index";

interface MyProps{
	user: User,
	logOutUser: ()=>{}
}

class HeaderComponent extends React.Component<MyProps, any> {
	constructor(props) {
		super(props);
		
		this.logOut = this.logOut.bind(this);
		this.showLogOut = this.showLogOut.bind(this);
	}

	logOut(){
		this.props.logOutUser();
	}
	
	showLogOut(){
		let logOut = (
			<Link to={"/"} onClick={() => this.logOut()}>
				<div className="nav-item">
					Log Out
				</div>
			</Link>
		);
		
		return this.props.user.isAuth === undefined || this.props.user.isAuth === false ? "": logOut;
	}
	
	
	render() {
		return (
			<div className="header-component">
				<Link to="/">
					<div id="header-logo">
						<h1>Job Board</h1>
					</div>
				</Link>
				<Link to={"/register"}>
					<div className="nav-item">
						Sign Up
					</div>
				</Link>
				
				<Link to={"/login"}>
					<div className="nav-item">
						{this.props.user === null || this.props.user.isAuth === false || this.props.user.isAuth === undefined ? "Log In" : "Dashboard"}
					</div>
				</Link>
				
				{ this.props.user !== null ? this.showLogOut() : null}

			</div>
		)}
};

export default HeaderComponent;