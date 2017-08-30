import * as React from 'react';

import "./simpleForm.scss";

interface myProps {
	header: string,
	inputs: any[],
	submitBtnText: string,
	verifyInputs: string[] | null,
	onSubmitCB: (any) => void
}

interface inputObject {
	content: string,
	SF_error: boolean,
	required: boolean

}

class SimpleForm extends React.Component<myProps, any> {
	constructor(props) {
		super(props);

		let propObj: any = {};

		/**Crate an object for each input to hold the user input and to know if there is an
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
			inputsToVerify: this.props.verifyInputs !== null ? this.props.verifyInputs.map(input => input + '-verify') : null,
			formSubmitted: false,
			formErrors: false,
			inputValues: {...propObj}
		}
	}

	/**
	 *
	 * @param {string} key
	 * @param event
	 */
	handleChange(key: string, event: any) {
		let keyObject = {...this.state.inputValues};

		keyObject[key].content = event;

		this.setState({inputValues: keyObject});
	}

	/**
	 * Will either add or remove the SF_error and error message
	 * @param {boolean} setError - Removes or adds error and message
	 * @param {string} message - The message readout when displaying an error
	 * @param {string} inputId - The indexed id of the input we want to alter
	 */
	handleVerificationError(setError: boolean, message: string, inputId: string) {
		let inputRef = {...this.state.inputValues};

		if (setError === true) {
			inputRef[inputId + '-verify'].SF_error = true;
			inputRef[inputId + '-verify'].SF_errorMessage = message;
		} else if (setError === false) {
			inputRef[inputId + '-verify'].SF_error = false;
			inputRef[inputId + '-verify'].SF_errorMessage = message;
		}

		this.setState({inputValues: {...inputRef}});
	}

	/**
	 * Runs when form is submitted.
	 * Checks if any two items that need verification match
	 */
	checkForErrors():void {
		let inputs = {...this.state.inputValues};
		let formError = false;

		if(this.state.inputsToVerify !== null){

			// need to check that all values contain something
			Object.keys(inputs).map(input => {

				//Need to match any inputs that need verification
				if (this.state.inputsToVerify.includes(input + '-verify')) {
					if (inputs[input].content !== inputs[input + '-verify'].content) {
						formError = true;
						this.handleVerificationError(true, 'Does not match', input);
					} else {
						this.handleVerificationError(false, '', input);
					}
				}
			});
		}

		if (formError === false) {
			this.submitForm();
		}

	}
	/**
	 * Creates and sends a key-value pair object to the onSubmitCB given as props
	 * @property name - Is the id given as the input id in the props, the value is what the user typed in the form
	 */
	submitForm():void {
		let formObject = {};

		for (let input in this.state.inputValues) {
			if (this.state.inputValues.hasOwnProperty(input)) {
				formObject[input] =	this.state.inputValues[input].content
			}
		}
		this.props.onSubmitCB(formObject);
	}

	handleSubmit(event) {
		(event as Event).preventDefault();
		this.checkForErrors();
	}

	createInputs() {
		return this.props.inputs.map((input, index) => {

			//inputID
			let iID = input.id;

			return (
				<div
					className={this.state.inputValues[iID].SF_error === true ? 'job-form-group error' : 'job-form-group'}
					key={`${index}${iID}`}>
					<label htmlFor={iID}>{input.label}</label>
					<input
						required={input.required}
						placeholder={input.placeHolder}
						id={iID}
						onChange={(event) => {
							this.handleChange(iID, event.target.value)
						}}
						type={input.type}/>
					{this.state.inputValues[iID].SF_error === true ?
						<div className="input-error-box">{this.state.inputValues[iID].SF_errorMessage}</div> : null}
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