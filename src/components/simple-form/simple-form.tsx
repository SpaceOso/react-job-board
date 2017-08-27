import * as React from 'react';

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
			propObj[input.id] = '';
		});

		this.state = {
			inputsToVerify: this.props.verifyInputs.map(input => input + '-verify'),
			inputValues: {...propObj}
		}
	}

	handleChange(key, event) {
		let keyObject = {...this.state.inputValues};
		// console.log("key:", key);
		// console.log("event:", event);

		keyObject[key] = event;

		this.setState({inputValues: keyObject});
	}


	handleSubmit(event){
		(event as Event).preventDefault();
		this.props.onSubmitCB(this.state.inputValues);
	}

	createInputs() {
		let inputList: any[] = [];
		return this.props.inputs.map((input, index) => {

			//need to check if the input id matches anything in verifyInputs
			if (this.state.inputsToVerify.includes(input.id + '-verify')) {
				console.log("we found on the inputs to verify:", input.id);
			}

			return (
				<div className="jb-form-group" key={`${index}${input.id}`}>
					<label htmlFor={input.id}>{input.label}</label>
					<input
						required={input.required}
						placeholder={input.placeHolder}
						id={input.id}
						onChange={(event) => {
							this.handleChange(input.id, event.target.value)
						}}
						type={input.type}/>
				</div>
			)
		});
	}

	render() {
		return (
			<div>
				<form action="" onSubmit={(event) => this.handleSubmit(event)}>
					<h1>{this.props.header}</h1>
					<div>{this.createInputs()}</div>
					<button>Submit Form</button>
				</form>
			</div>
		)
	}
}

export default SimpleForm;