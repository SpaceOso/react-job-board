import React from 'react';

class MainLayout extends React.Component{
	render(){
		
		return (
			<div>
				<p>I'm the main layout component everything should go in here.</p>
				<h1>Welcome back {this.props.user.firstName}!!</h1>
				You're inside the user dashboard with email {this.props.user.email}
				account type:{this.props.user.accountType}<br/>
				employer: {this.props.user.employer}<br/>
			</div>
		)
	}
}

export default MainLayout;