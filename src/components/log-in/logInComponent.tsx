import * as React from 'react';


import SpinnerComponent from "../spinners/spinnerComponent";
import {Redirect} from "react-router";
import {SiteErrors, SiteFetching, User} from "../../types/index";
import SimpleForm from "../simple-form/simpleForm";

/**
 * styles
 */
import './styles/loginComponent.scss';

interface MyProps {
	user: User,
	logInUser: (userInfo) => {},
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
		this.handleLoginRoute = this.handleLoginRoute.bind(this);
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

	handleLoginRoute(){
		if(this.props.user.isAuth){
			if(this.props.user.employerId !== null){
				return <Redirect to={`${'/user/dashboard/'}${this.props.user.id}/home`}/>
			}
			 return <Redirect to={`${'/user/dashboard/'}${this.props.user.id}/register`}/>
		}

		return null;
	}

	render() {
		return (
			this.props.siteFetching.isFetching === true ?

				<SpinnerComponent/> :

				<div className="employer-register-Component">
					{this.handleLoginRoute()}
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