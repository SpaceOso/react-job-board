import * as React from 'react';
import {Redirect} from 'react-router-dom';

import {AuthUser, SiteFetching, User} from "../../types/index";
import SpinnerComponent from "../spinners/spinnerComponent";

//styles
import './styles/userRegister.scss';
import SimpleForm from "../simple-form/simpleForm";
import {JumboTron} from "../home/jumboTron";

export interface registerComponent {
	event: Event,
	redirect: false
	registerUser: (user:AuthUser) => any,
	user: User,
	siteFetching: SiteFetching,
	errors: {
		fName: boolean,
		lName: boolean,
		email: boolean,
		verifyEmail: boolean,
		password: boolean,
		passwordVerify: boolean
	}
}

interface formInputs {
	label: string,
	required: boolean,
	type: string,
	placeHolder: string,
	id: string
}

type registerComponentState = {
	redirect: false
}


class UserRegisterComponent extends React.Component<registerComponent, registerComponentState> {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false
		};

		this.returnRegisterForm = this.returnRegisterForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.redirectToDashboard = this.redirectToDashboard.bind(this);
	}

	handleSubmit(userModel:AuthUser) {
		console.log("form has been submitted with:", userModel);
		let newUser: AuthUser = {
			email: userModel.email,
			firstName: userModel.firstName,
			lastName: userModel.lastName,
			password: userModel.password
		};

		console.log("we're trying to submit newUser:", newUser);
		this.props.registerUser(newUser);
	}

	redirectToDashboard() {
		return (
			<Redirect to={`/user/dashboard/${this.props.user._id}`} push/>
		)
	}

	returnRegisterForm() {
		let inputArr: formInputs[] = [
			{
				label: 'First Name',
				required: true,
				type: 'text',
				placeHolder: 'Enter First Name',
				id: 'firstName'
			},
			{
				label: "Last Name",
				required: true,
				type: 'text',
				placeHolder: "Enter Last Name",
				id: 'lastName'
			},
			{
				label: "Email",
				required: true,
				type: 'email',
				placeHolder: "Enter your email",
				id: 'email'
			},
			{
				label: "Confirm Email",
				required: true,
				type: 'email',
				placeHolder: "Please confirm your email",
				id: 'email-verify'
			},
			{
				label: "Password",
				required: true,
				type: 'password',
				placeHolder: "Enter password",
				id: 'password'
			},
			{
				label: "Verify Password",
				required: true,
				type: 'password',
				placeHolder: "Please Verify Password",
				id: 'password-verify'
			}
		];

		return (
			<div className="employer-register-Component">
				<div className="register-form">
					<SimpleForm
						header="Sign Up"
						inputs={inputArr}
						submitBtnText="Register Account"
						onSubmitCB={this.handleSubmit}
						verifyInputs={['email', 'password']}
					/>
					{/*Once the user registers it should take them to the dashboard*/}
					{this.props.user.isAuth === true ? this.redirectToDashboard() : null}
					{/*This will display once we register our user*/}
					{this.props.user.employerId !== null ? this.redirectToDashboard() : null}
				</div>
			</div>
		)
	}

	render() {

		if (this.props.siteFetching.isFetching === true) {
			return <SpinnerComponent/>
		} else {
			return this.returnRegisterForm();
		}
	}
}

export default UserRegisterComponent;