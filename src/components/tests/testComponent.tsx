import * as React from 'react';
import * as TinyMCE from 'tinymce';
import "../../../node_modules/draft-js/dist/Draft";
import TinymceComponent from "../tinymce/tinymceComponent";

const myState:any  = {
	jobTitle: "",
	jobDescription: "",
	keywords: [],
	value: ''
};

class TestComponent extends React.Component<any, any>{
	constructor(props){
		super(props);

		this.state = {
			formContent: ''
		};
		// this.onChange = (editorState) => this.setState({editorState});
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(value){
		// this.setState({value});
		this.setState({formContent: value});
		console.log(value);
	};

	onSubmit(event){
		console.log("form submitted holmes");
		console.log("form has been submitted: ", this.state.formContent);
		event.preventDefault();
	}

	render(){
		return(
			<div className="text-container">
			<div> I'm the thest componet</div>
				<form  onSubmit={this.onSubmit}>

				<h1>Below should be tinymce:</h1>
				<TinymceComponent
					id="testId"
					onEditorChange={this.onChange}
					priorContent={null}
				/>
				<button>Submit me bro</button>
				</form>
			</div>
		)
	}
}

export default TestComponent;