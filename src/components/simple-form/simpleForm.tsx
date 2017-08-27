import * as React from 'react';

import "./simpleForm.scss";

interface myProps {
	header: string,
	inputs: any[],
	submitBtnText: string,
	verifyInputs: string[],
	onSubmitCB: (userModel) => void
}

class SimpleForm extends React.Component<myProps, any> {
	constructor(props) {
		super(props);

		let propObj: any = {};

		this.props.inputs.map(input => {
			propObj[input.id] = {
				content: '',
				SF_error: false
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


	handleSubmit(event){
		(event as Event).preventDefault();
		if(this.state.errors.length <= 0 ){
			console.log("do not have any errors so we can submit the form");
			// this.props.onSubmitCB(this.state.inputValues);
		}
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