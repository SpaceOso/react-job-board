import * as React from 'react';


import './styles/loginComponent.scss';
import SpinnerComponent from "../spinners/spinnerComponent";
import {Redirect} from "react-router";
import {SiteErrors, SiteFetching, User} from "../../types/index";
import SimpleForm from "../simple-form/simpleForm";

interface MyProps {
	user: User,
	logInUser: (userINfo) => {},
	siteFetching: SiteFetching,
	siteErrors: SiteErrors
}

interface MyState {
	userEmail: string,
	userPassword: string,
	redirect: string
	isFetching: boolean,
	errors: object,
}


class LogInComponent extends React.Component<MyProps, MyState> {
	constructor(props) {
		super(props);

		this.state = {
			userEmail: '',
			userPassword: '',
			redirect: '',
			isFetching: false,
			errors: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(key, event) {
		let keyObject = {...this.state};

		keyObject[key] = event;

		this.setState(keyObject);
	}

	handleSubmit(userObject) {
		let user = {
			email: userObject.email,
			password: userObject.password //todo need to hash this so I'm not sending plain password
		};

		this.props.logInUser(user);
	}

	render() {
		return (
			this.props.siteFetching.isFetching === true ?

				<SpinnerComponent/> :

				<div className="employer-register-Component">
					{this.props.user.isAuth === true ?
						<Redirect to={`${'/user/dashboard/'}${this.props.user._id}`}/> : null}
					<h1>Enter the following information to log in</h1>
					<h3>{this.props.siteErrors.login !== null ? this.props.siteErrors.login.message : null}</h3>
					<div>
						{this.props.siteFetching.isFetching ? <SpinnerComponent/> : null}
					</div>
					<SimpleForm header="Sign In"
					            inputs={[
						            {
							            label: 'Enter Email:',
							            required: true,
							            type: 'email',
							            placeHolder: 'Enter Email:',
							            id: 'email'
						            },
						            {
							            label: 'Enter Password:',
							            required: true,
							            type: 'password',
							            placeHolder: 'Enter Password',
							            id: 'password'
						            }
					            ]}
					            submitBtnText="Log In"
					            verifyInputs={null}
					            onSubmitCB={this.handleSubmit}
					/>
				</div>
		)
	}
}

export default LogInComponent;