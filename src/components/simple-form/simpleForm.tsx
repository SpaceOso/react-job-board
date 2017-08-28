import * as React from 'react';

import "./simpleForm.scss";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

interface myProps {
	header: string,
	inputs: any[],
	submitBtnText: string,
	verifyInputs: string[],
	onSubmitCB: (userModel) => void
}

interface inputObject{
	content: string,
	SF_error: boolean,
	required: boolean

}

class SimpleForm extends React.Component<myProps, any> {
	constructor(props) {
		super(props);


		let propObj: any = {};

		/*Crate an object for each input to hold the user input and to know if there is an
		* error associated with that input.*/
		this.props.inputs.map(input => {
			propObj[input.id] = {
				content: '',
				SF_error: false,
				SF_errorMessage: '',
				type: input.type,
				required: input.required
			};
		});

		this.state = {
			inputsToVerify: this.props.verifyInputs.map(input => input + '-verify'),
			formSubmitted: false,
			inputValues: {...propObj}
		}
	}

	handleChange(key: string, event: any) {
		let keyObject = {...this.state.inputValues};
		// console.log("key:", key);
		// console.log("event:", event);

		keyObject[key].content = event;

		this.setState({inputValues: keyObject});
	}

	checkForErrors(){
		let inputs = {...this.state.inputValues};
		//need to check that all values contain something
		Object.keys(inputs).map(input => {
			let thisInput = inputs[input];

			if(thisInput.required === true) {
				// console.log("this field is required: ", thisInput);
				if(thisInput.content.length <= 0){
					thisInput.SF_error = true;
					thisInput.SF_errorMessage = 'This field is required'
				}
			}

			if(thisInput.type === 'email'){
				console.log("this field is an email:", thisInput);
			}
		});

		//need to check that emails follow email pattern
	}

	handleSubmit(event){
		(event as Event).preventDefault();
		this.checkForErrors();
		console.log("form has been submitted");
	}

	createInputs() {
		return this.props.inputs.map((input, index) => {

			//inputID
			let iID = input.id;

			return (
				<div className={this.state.inputValues[iID].SF_error === true ? 'job-form-group error' : 'job-form-group'} key={`${index}${iID}`}>
					<label htmlFor={iID}>{input.label}</label>
					<input
						required={input.required}
						placeholder={input.placeHolder}
						id={iID}
						onChange={(event) => {
							this.handleChange(iID, event.target.value)
						}}
						type={input.type}/>
					{this.state.inputValues[iID].SF_error === true ? <div className="input-error-box">Error was</div> : null}
				</div>
			)
		});
	}

	render() {
		return (
			<div className="simple-form">
				<form action="" onSubmit={(event) => this.handleSubmit(event)}>
					<h1>{this.props.header}</h1>
					<div>{this.createInputs()}</div>
					<button>Submit Form</button>
				</form>
				{/*<div className="form-error-box">Erorr: Please see errors above.</div>*/}
			</div>
		)
	}
}

export default SimpleForm;