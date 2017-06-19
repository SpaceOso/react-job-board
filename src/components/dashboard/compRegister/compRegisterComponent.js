import React from "react";

//styles
import "./styles/compRegisterComponent.scss";

class CompRegisterComponent extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			companyName: "",
			address: "",
			city: "",
			state: "",
			zip: "",
			logoImg: "",
			website: "",
			facebook: "",
			linkedIn: "",
			twitter: ""
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleEmployerSubmit = this.handleEmployerSubmit.bind(this);
	}

	handleEmployerSubmit(){
		//this will call an action that will send employer info to server
		this.props.submitData(this.state);
	}

	handleChange(key, event) {
		let keyObject = {...this.state};
		
		keyObject[key] = event;
		
		this.setState(keyObject);
	}
	
	render() {
		return (
			<div className="comp-register">
				<h1>We need to set up your employer before we can start!</h1>
				<div className="form-container">
					<form action="" onSubmit={() => this.handleEmployerSubmit()}>
						{/*name and logo*/}
						<div id="name-logo-group">
							<div id="company-name-container">
								<label htmlFor="company-name">Company Name:</label>
								<input type="text"
								       id="company-name"
								       placeholder="enter company name"
								       value={this.state.companyName}
								       onChange={(event) => this.handleChange('companyName', event.target.value)}
								/>
							</div>
							
							<div id="company-logo-container">
								<label htmlFor="company-logo">logo image:</label>
								<input type="text"
								       id="company-logo"
								       placeholder="enter company name"
								       value={this.state.logoImg}
								       onChange={(event) => this.handleChange('logoImg', event.target.value)}
								/>
							</div>
						
						</div>
						
						<div id="location-group">
							<h3>Location</h3>
							<div>
								{/*<label htmlFor="company-address">address:</label>*/}
								<input type="text"
								       id="company-address"
								       placeholder="address"
								       value={this.state.address}
								       onChange={(event) => this.handleChange('address', event.target.value)}
								/>
							</div>
							<div>
								{/*<label htmlFor="company-city">city:</label>*/}
								<input type="text"
								       id="company-city"
								       placeholder="city"
								       value={this.state.city}
								       onChange={(event) => this.handleChange('city', event.target.value)}
								/>
							</div>
							<div>
								{/*<label htmlFor="company-state">state:</label>*/}
								<input type="text"
								       id="company-state"
								       placeholder="state"
								       value={this.state.state}
								       onChange={(event) => this.handleChange('state', event.target.value)}
								/>
							</div>
							<div>
								{/*<label htmlFor="company-zip">zip</label>*/}
								<input type="text"
								       id="company-zip"
								       placeholder="zip"
								       value={this.state.zip}
								       onChange={(event) => this.handleChange('zip', event.target.value)}
								/>
							</div>
						</div>
						
						
						<div id="social-media">
							<h3>Social Media</h3>
							<div>
								{/*<label htmlFor="company-website">Company Website:</label>*/}
								<input type="text"
								       id="company-website"
								       placeholder="website"
								       value={this.state.website}
								       onChange={(event) => this.handleChange('website', event.target.value)}
								/>
							</div>
							<div>
								{/*<label htmlFor="company-twitter">Company Twitter:</label>*/}
								<input type="text"
								       id="company-twitter"
								       placeholder="twitter"
								       value={this.state.twitter}
								       onChange={(event) => this.handleChange('twitter', event.target.value)}
								/>
							</div>
							<div>
								{/*<label htmlFor="company-facebook">Company Facebook:</label>*/}
								<input type="text"
								       id="company-facebook"
								       placeholder="facebook"
								       value={this.state.facebook}
								       onChange={(event) => this.handleChange('facebook', event.target.value)}
								/>
							</div>
							<div>
								{/*<label htmlFor="company-linkedin">Company linkedin:</label>*/}
								<input type="text"
								       id="company-linkedin"
								       placeholder="linkeIn"
								       value={this.state.linkedIn}
								       onChange={(event) => this.handleChange('linkedIn', event.target.value)}
								/>
							</div>
						</div>
						<button>Submit Company</button>
					</form>
				</div>
			</div>
		)
	}
}

export default CompRegisterComponent;