import * as React from 'react';
import {Editor, EditorState} from 'draft-js';

import "../../../node_modules/draft-js/dist/Draft";

const myState:any  = {
	jobTitle: "",
	jobDescription: "",
	keywords: [],
	value: ''
};

class TestComponent extends React.Component<any, any>{
	constructor(props){
		super(props);

		this.state = {editorState: EditorState.createEmpty()};
		// this.onChange = (editorState) => this.setState({editorState});
		this.onChange = this.onChange.bind(this);
	}

	onChange = (editorState) => {
		this.setState({editorState});
		console.log(editorState);
	};


	/*onChange = (value) => {
		// this.setState({value});
		console.log(value);
	};*/

	render(){
		return(
			<div className="text-container">
			<div> I'm the thest componet</div>
				<Editor
					editorState={this.state.editorState}
					onChange={this.onChange}
					placeholder="Add text here"
					spellCheck={true}
				/>
			</div>
		)
	}
}

export default TestComponent;