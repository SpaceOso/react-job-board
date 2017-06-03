import React from 'react';

//styles
import "./styles/employerRegister.scss";




class EmployerRegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        console.log("Form submitted!");
    }


    render() {
        return (
            <div className="employer-register-Component">
                Please fill out this form to create your FREE account with us!
                <form action="" onSubmit={() => this.handleSubmit()}>
                    <div className="jb-form-group">
                        <label htmlFor="employer-name">Company Name:</label>
                        <input id="employer-name" type="text" placeholder="Company Name" required/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="employer-email">Email:</label>
                        <input id="employer-email" type="text" placeholder="Company Email" required/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="employer-password">Password:</label>
                        <input id="employer-password" type="password" placeholder="Enter your password" required/>

                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="employer-address">Address:</label>
                        <input id="employer-address" type="text" placeholder="address" required/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="employer-city">City:</label>
                        <input id="employer-city" type="text" placeholder="City" required/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="employer-state">State:</label>
                        <input id="employer-state" type="text" placeholder="state" required/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="employer-zip">Zip:</label>
                        <input id="employer-zip" type="text" placeholder="zip" required/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="employer-logo">Upload Company Logo:</label>
                        <input id="employer-logo" type="text" placeholder="logo"/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="social-web">Company Website:</label>
                        <input type="text" id="social-web" placeholder="Website"/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="social-twitter">Company blog:</label>
                        <input type="text" id="social-twitter" placeholder="Twitter"/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="social-twitter">Twitter:</label>
                        <input type="text" id="social-twitter" placeholder="twitter"/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="social-facebook">Facebook:</label>
                        <input type="text" id="social-facebook" placeholder="facebook"/>
                    </div>
                    <div className="jb-form-group">
                        <label htmlFor="social-linkedin">Linkedin:</label>
                        <input type="text" id="social-linkedin" placeholder="linkedin"/>
                    </div>

                    <button>Submit Form</button>
                </form>
            </div>
        )
    }
}

export default EmployerRegisterComponent;