import React from 'react';


import './styles/loginComponent.scss';
import SpinnerComponent from "../spinners/spinnerComponent";

class LogInComponent extends React.Component {
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

    handleSubmit() {
        let user = {
            email: this.state.userEmail,
            password: this.state.userPassword //todo need to hash this so I'm not sending plain password
        };

        this.props.logInUser(user);
    }

    render() {
        return (
            <div className="employer-register-Component">
                <h1>Enter the following information to log in</h1>
                <h3>{this.props.errorMessage}</h3>
                <div>
                    {this.props.isFetching === true ? <SpinnerComponent/> : null}
                </div>
                <form action="" onSubmit={() => this.handleSubmit()}>
                    <div className="jb-form-group">
                        <label htmlFor="user-email">Enter Email:</label>
                        <input id="user-email"
                               type="text"
                               placeholder="email"
                               value={this.state.userEmail}
                               onChange={(event) => this.handleChange('userEmail', event.target.value)}
                        />
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="user-password">Enter Password:</label>
                        <input id="user-password"
                               type="password"
                               value={this.state.userPassword}
                               onChange={(event) => this.handleChange('userPassword', event.target.value)}
                        />
                    </div>
                    <button>Log In</button>
                </form>
            </div>
        )
    }
}

export default LogInComponent;