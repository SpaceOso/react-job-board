import React from 'react';

//styles
import "./styles/userRegister.scss";

/*
 *   "_id": "58b2e7b26581e1150868c70e",
 "email": "01@email.com",
 "password": "sha1$73eed769$1$43f85344f8a0ac83b8f90dd88c5f6daab722d720",
 "name": "Rico Dev",
 "logoImg": "",
 "__v": 2,
 "applicants": [],
 "jobs": [
 {
 "_id": "58b2ea5caec1b50e44fd211b",
 "updatedAt": "2017-02-26T14:46:52.571Z",
 "createdAt": "2017-02-26T14:46:52.571Z",
 "jobTitle": "Back End Developer",
 "jobDescription": "<p>Second job post on the new laptop! This one is for a back end developer.</p>\n<p>&nbsp;</p>\n<p>Requirements for this job are to know a lot of languages.</p>\n<p>Probably some java becuase I see it a lot. Definetly need to know SQL or Mongo you know..database stuffs.</p>",
 "employerName": "Rico Dev",
 "employer": "58b2e7b26581e1150868c70e",
 "employerLogo": "",
 "__v": 0,
 "applicants": []*/


class UserRegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                fName: '',
                lName: '',
                email: '',
                emailVerify: '',
                password: '',
                passwordVerify: '',
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
    }

    handleSubmit() {
        console.log("Form submitted!");
        console.log("submitting user with:", this.state.user);
    }

    handleChange(key, event) {
        let keyObject = {...this.state.user};

        keyObject[key] = event;

        console.log(keyObject);

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

                    <button>Submit Form</button>
                </form>
            </div>
        )
    }
}

export default UserRegisterComponent;