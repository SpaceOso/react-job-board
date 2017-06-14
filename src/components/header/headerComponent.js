import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//actions
import {logOutUser} from '../../actions/authActions';

class HeaderComponent extends React.Component {
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
		
		return this.props.user.auth === undefined || this.props.user.auth === false ? "" : logOut;
	}
	
	
	render() {
		console.log("header location:", this.props.location);
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
						{this.props.user.auth === undefined || this.props.user.auth === false ? "Log In" : "Dashboard"}
					</div>
				</Link>
				
				{this.showLogOut()}

			</div>
		)}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({logOutUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(HeaderComponent);