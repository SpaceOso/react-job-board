import React from 'react';

//styles
import "./styles/employerRegister.scss";

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