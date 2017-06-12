import React from "react";

//styles
import "./styles/compRegisterComponent.scss";

class CompRegisterComponent extends React.Component {
    render() {
        return (
            <div >
                <h1>We need to set up your employer before we can start!</h1>
                <h3>Please fill out this form to get started!</h3>
                <form action="">
                    <div>
                        <label htmlFor="company-name">Company Name:</label>
                        <input type="text" id="company-name" placeholder="enter company name"/>
                    </div>
                    <div>
                        <label htmlFor="company-address">address:</label>
                        <input type="text" id="company-address" placeholder="enter company address"/>
                    </div>
                    <div>
                        <label htmlFor="company-city">city:</label>
                        <input type="text" id="company-city" placeholder="enter company city"/>
                    </div>
                    <div>
                        <label htmlFor="company-state">state:</label>
                        <input type="text" id="company-state" placeholder="enter company sate"/>
                    </div>
                    <div>
                        <label htmlFor="company-zip">zip</label>
                        <input type="text" id="company-zip" placeholder="enter company zip"/>
                    </div>
                    <div>
                        <label htmlFor="company-logo">logo image:</label>
                        <input type="text" id="company-logo" placeholder="enter company name"/>
                    </div>
                    <div>
                        <label htmlFor="company-website">Company Website:</label>
                        <input type="text" id="company-website" placeholder="enter company website"/>
                    </div>
                    <div>
                        <label htmlFor="company-blog">Company blog:</label>
                        <input type="text" id="company-blog" placeholder="enter company blog"/>
                    </div>
                    <div>
                        <label htmlFor="company-twitter">Company Twitter:</label>
                        <input type="text" id="company-twitter" placeholder="enter company twitter"/>
                    </div>
                    <div>
                        <label htmlFor="company-facebook">Company Facebook:</label>
                        <input type="text" id="company-facebook" placeholder="enter company facebook"/>
                    </div>
                    <div>
                        <label htmlFor="company-linkedin">Company linkedin:</label>
                        <input type="text" id="company-linkedin" placeholder="enter company linkedin"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CompRegisterComponent;