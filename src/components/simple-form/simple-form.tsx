import * as React from 'react';

interface myProps{
	header: string,
	inputs: any[],
	onInputChangeCB: (key:string, event:string)=>void,

};

class SimpleForm extends React.Component<myProps, any>{
	constructor(props){
		super(props);

		this.state ={

		}
	}



	createInputs(){
		return this.props.inputs.map((input, index) => {
			return (
				<div className="jb-form-group" key={`${index}${input.id}`}>
					<label htmlFor={input.id}>{input.label}</label>
					<input
						required={input.required}
						placeholder={input.placeHolder}
						id={input.id}
						onChange={ (event)=>{ this.props.onInputChangeCB(input.id, event.target.value) }}
						type={input.type}/>
				</div>
			)
		});

	}

	render(){
		return(
			<div>
				I'm the simple forms container;
				<div>{this.createInputs()}</div>
			</div>
		)
	}
}

export default SimpleForm;