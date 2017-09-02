import * as React from "react";

//styles
import "./styles/compRegisterComponent.scss";
import {User} from "../../../types/index";
import SpinnerComponent from "../../spinners/spinnerComponent";
import {Redirect, RouteComponentProps} from "react-router";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;


interface compRegisterProps extends RouteComponentProps<any>{
	submitData
	user: User,
}

interface MyState{
	name: string,
	address: string,
	city: string,
	state: string,
	zip: string,
	logoImg: File | null,
	website: string,
	facebook: string,
	linkedIn: string,
	twitter: string
}

class CompRegisterComponent extends React.Component<compRegisterProps, MyState> {
	private filesInput: HTMLInputElement;

	constructor(props) {
		super(props);
		
		this.state = {
			name: "",
			address: "",
			city: "",
			state: "",
			zip: "",
			logoImg: null,
			website: "",
			facebook: "",
			linkedIn: "",
			twitter: ""
		};


		this.sendRegistrationToServer = this.sendRegistrationToServer.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEmployerSubmit = this.handleEmployerSubmit.bind(this);
		this.renderRegisterForm = this.renderRegisterForm.bind(this);
	}

	sendRegistrationToServer(){
		// console.log("Form has been submitted to server:", this.state);
		let data = new FormData();
		data.append('file', this.state.logoImg!);

		let testForm = {};
		for(let entries in this.state){
			if(this.state.hasOwnProperty(entries))
			{
				console.log("entries", entries);
				console.log("this.state.", this.state[entries]);
				testForm[entries] = this.state[entries];
				data.append(entries, this.state[entries]);
			}
		}

		console.log("and the data is:", testForm);
		// data.append('name', this.state.name);
		// data.append('address', this.state.address);
		// data.append('city', this.state.city);
		// data.append('state', this.state.state);
		// data.append('zip', this.state.zip);
		// data.append('website', this.state.website);
		// data.append('facebook', this.state.facebook);
		// data.append('linkedIn', this.state.linkedIn);
		// data.append('twitter', this.state.twitter);
		// this.props.submitData(data);
		// data.append("employer", this.state);

		this.props.submitData(data);
		// this.props.submitData(this.state);
	}


	handleEmployerSubmit(event){
		(event as Event).preventDefault();
		console.log("show me files");
		//this will call an action that will send employer info to server
		console.log(this.filesInput.files);
		if(this.filesInput.files !== null){
			if(this.filesInput.files.length > 0){
				console.log("there should be a file on this now..");
				console.log(this.filesInput);
				this.setState({logoImg: this.filesInput.files[0]}, this.sendRegistrationToServer);
			}
		} else {
			console.log('and the form state:', this.state);
			this.sendRegistrationToServer();
		}

	}

	handleChange(key, event) {
		let keyObject = {...this.state};
		
		keyObject[key] = event;
		
		this.setState(keyObject);
	}

	renderRegisterForm(){
		return (
			<div className="comp-register">
				<h1>We need to set up your employer before we can start!</h1>
				<div className="form-container">
					<form action="" onSubmit={(event) => this.handleEmployerSubmit(event)}>
						{/*name and logo*/}
						<div id="name-logo-group">
							<div id="company-name-container">
								<label htmlFor="company-name">Company Name:</label>
								<input type="text"
								       required
								       id="company-name"
								       placeholder="enter company name"
								       value={this.state.name}
								       onChange={(event) => this.handleChange('name', event.target.value)}
								/>
							</div>

							<div id="company-logo-container">
								<label htmlFor="company-logo">logo image:</label>
								<input type="file"
								       id="company-logo"
								       placeholder="upload logo"
								       name="company-logo"
								       accept={'image/gif, image/png, image/jpeg'}
								       ref={ (input:HTMLInputElement) => {this.filesInput  = input }}
								/>
							</div>

						</div>

						<div id="location-group">
							<h3>Location</h3>
							<div>
								{/*<label htmlFor="company-address">address:</label>*/}
								<input type="text"
								       required
								       id="company-address"
								       placeholder="address"
								       value={this.state.address}
								       onChange={(event) => this.handleChange('address', event.target.value)}
								/>
							</div>
							<div>
								{/*<label htmlFor="company-city">city:</label>*/}
								<input type="text"
								       required
								       id="company-city"
								       placeholder="city"
								       value={this.state.city}
								       onChange={(event) => this.handleChange('city', event.target.value)}
								/>
							</div>
							<div>
								{/*<label htmlFor="company-state">state:</label>*/}
								<input type="text"
								       required
								       id="company-state"
								       placeholder="state"
								       value={this.state.state}
								       onChange={(event) => this.handleChange('state', event.target.value)}
								/>
							</div>
							<div>
								{/*<label htmlFor="company-zip">zip</label>*/}
								<input type="text"
								       required
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
								       required
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

	render() {
		if(this.props.user.isFetching){
			return <SpinnerComponent />;
		}

		if(this.props.user.employerId !== null){
			return <Redirect to={`${'/user/dashboard/'}${this.props.user._id} `} />
		}

		return this.renderRegisterForm();
	}
}

export default CompRegisterComponent;