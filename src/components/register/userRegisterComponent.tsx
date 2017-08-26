import * as React from 'react';
import {Redirect} from 'react-router-dom';

import {SiteFetching, User} from "../../types/index";
import SpinnerComponent from "../spinners/spinnerComponent";

//styles
import './styles/userRegister.scss';
import SimpleForm from "../simple-form/simple-form";

export interface registerComponent {
	event: Event,
	redirect: false
	registerUser: (user) => any,
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

interface formInputs{
	label: string,
	required: boolean,
	type: string,
	placeHolder: string,
	id: string
}

type registerComponentState = {
	redirect: false,
	user: any,
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

		this.returnRegisterForm = this.returnRegisterForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.redirectToDashboard = this.redirectToDashboard.bind(this);
	}

	handleSubmit(event) {
		(event as Event).preventDefault();
		console.log("form has been submitted with:", this.state.user);
		this.props.registerUser(this.state.user);
	}

	redirectToDashboard() {
		return (
			<Redirect to={`/user/dashboard/${this.props.user._id}`} push/>
		)
	}

	handleChange(key, event) {
		let keyObject = {...this.state.user};
		console.log("key:", key);
		console.log("event:", event);

		keyObject[key] = event;

		this.setState({user: keyObject});
	}

	onSubmitFunc(){
		console.log("form has been submitted");
	}

	returnRegisterForm() {
		let inputArr: formInputs[] = [
			{
				label: 'First Name',
				required: true,
				type: 'text',
				placeHolder: 'Enter First Name',
				id: 'fName'
			},
			{
				label: "Last Name",
				required: true,
				type: 'text',
				placeHolder: "Enter Last Name",
				id: 'lName'
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
				id: 'pWord'
			},
			{
				label: "Verify Password",
				required: true,
				type: 'password',
				placeHolder: "Please Verify Password",
				id: 'pWord-verify'
			}
		];

		return (
			<div className="employer-register-Component">

				<div className="register-form">
					<form action="" onSubmit={(event) => this.handleSubmit(event)}>
						<SimpleForm
							header="Sign Up"
							inputs={inputArr}
							onInputChangeCB={this.handleChange}
						/>
						<button>Submit Form</button>
					</form>
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