import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

//actions
import {registerUser} from '../../actions/authActions';

//styles
import './styles/userRegister.scss';
import {User} from "../../types/index";

export interface registerComponent{
	event: Event,
	redirect: false
	registerUser: (arg) => any,
	user: User,
	errors: {
		fName: boolean,
		lName: boolean,
		email: boolean,
		verifyEmail: boolean,
		password: boolean,
		passwordVerify: boolean
	}
}

type registerComponentState = {
	redirect: false,
	user: {
		fName: string,
		lName: string,
		email: string,
		emailVerify: string,
		password: string,
		passwordVerify: string,
		accountType: string,
		employer: string
	},
	errors: {
		fName: boolean,
		lName: boolean,
		email: boolean,
		verifyEmail: boolean,
		password: boolean,
		passwordVerify: boolean

	}
}


class UserRegisterComponent extends React.Component<registerComponent, registerComponentState> {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			user: {
				fName: '',
				lName: '',
				email: '',
				emailVerify: '',
				password: '',
				passwordVerify: '',
				accountType: 'user',
				employer: ''
			},
			errors: {
				fName: false,
				lName: false,
				email: false,
				verifyEmail: false,
				password: false,
				passwordVerify: false

			}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.redirectToDashboard = this.redirectToDashboard.bind(this);
	}
	
	handleSubmit() {
		(event as Event).preventDefault();
		this.props.registerUser(this.state.user);
	}
	
	redirectToDashboard() {
		return (
			<Redirect to={`/user/dashboard/${this.props.user._id}`} push/>
		)
	}
	
	handleChange(key, event) {
		let keyObject = {...this.state.user};
		
		keyObject[key] = event;
		
		this.setState({user: keyObject});
	}
	
	
	render() {
		return (
			<div className="employer-register-Component">
				Please fill out this form to create your FREE account with us!
				<form action="" onSubmit={() => this.handleSubmit()}>
					<div className="jb-form-group">
						<label htmlFor="user-f-name">First Name:</label>
						<input
							id="user-f-name"
							type="text"
							placeholder="First Name"
							value={this.state.user.fName}
							onChange={(event) => this.handleChange('fName', event.target.value)}
							required/>
					</div>
					<div className="jb-form-group">
						<label htmlFor="user-l-name">Last Name:</label>
						<input
							id="user-l-name"
							type="text"
							placeholder="Last Name"
							value={this.state.user.lName}
							onChange={(event) => this.handleChange('lName', event.target.value)}
							required/>
					</div>
					<div className="jb-form-group">
						<label htmlFor="employer-email">Email:</label>
						<input
							id="employer-email"
							type="text"
							placeholder="Company Email"
							onChange={(event) => this.handleChange('email', event.target.value)}
							value={this.state.user.email}
							required/>
					</div>
					<div className="jb-form-group">
						<label htmlFor="user-email-verify">Verify email:</label>
						<input
							id="employer-email"
							type="text"
							placeholder="Verify email"
							onChange={(event) => this.handleChange('emailVerify', event.target.value)}
							value={this.state.user.emailVerify}
							required
						/>
					</div>
					<div className="jb-form-group">
						<label htmlFor="employer-password">Password:</label>
						<input
							id="employer-password"
							type="password"
							placeholder="Enter your password"
							onChange={(event) => this.handleChange('password', event.target.value)}
							value={this.state.user.password}
							required/>
					
					</div>
					<div className="jb-form-group">
						<label htmlFor="employer-password-verify">Verify password:</label>
						<input
							id="employer-password-verify"
							type="password"
							placeholder="Verify your password"
							onChange={(event) => this.handleChange('passwordVerify', event.target.value)}
							value={this.state.user.passwordVerify}
							required/>
					</div>
					<div className="jb-form-group">
						<label htmlFor="user-accounttype">Select account type</label>
						<select value={this.state.user.accountType}
						        onChange={(event) => this.handleChange('accountType', event.target.value)}>
							<option value="user">User</option>
							<option value="employer">Employer</option>
						</select>
					</div>
					<button>Submit Form</button>
				</form>
				{/*Once the user registers it should take them to the dashboard*/}
				{this.props.user.isAuth === true ? this.redirectToDashboard() : null}
				{/*This will display once we register our user*/}
				{this.props.user.employerId !== undefined ? this.redirectToDashboard() : null}
			</div>
		)
	}
}

export default UserRegisterComponent;