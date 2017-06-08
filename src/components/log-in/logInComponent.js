import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

//actions
import {logInUser} from '../../actions/authActions';

import './styles/loginComponent.scss';

class LogInComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userEmail: '',
            userPassword: '',
            redirect: '',
            isFetching: false,
            errors: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, event) {
        let keyObject = {...this.state};

        keyObject[key] = event;

        this.setState(keyObject);
    }

    onSubmit(){
        console.log("submitting user!");
        let user = {
            email: this.state.userEmail,
            password: this.state.userPassword
        };

        this.props.logInUser(user);
    }

    render() {
        return (
            <div className="employer-register-Component">
                <h1>Enter the following information to log in</h1>
                <form action="" onSubmit={() => this.onSubmit()}>
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

function mapDsipatchToProps(dispatch) {
    return bindActionCreators({logInUser}, dispatch);
}

export default connect(null, mapDsipatchToProps)(LogInComponent);