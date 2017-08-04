import * as React from 'react';
import * as TinyMCE from 'tinymce';

interface thisState{
	id: string,
	onEditorChange,
};


class TinymceComponent extends React.Component<thisState, any>{
	constructor(props){
		super(props);

		this.state ={
			editor: null
		};

		this.onChange = this.onChange.bind(this);
	};

	componentDidMount(){
		console.log("we have been initiated TINYMCE!!!!!!!!!!");
		TinyMCE.init({
			// selector: `#${this.props.id}`,
			selector: 'textarea',
			setup: editor => {
				console.log("editor should have been initiated by now...");
				this.setState({ editor });
				editor.on('keyup change', () =>{
					const content = editor.getContent();
					this.props.onEditorChange(content);
				})
			}
		});
	}

	onChange(text){
		console.log(text);
	}

	componentWillUnmount(){
		console.log("we have been removed now...");
		TinyMCE.EditorManager.remove(this.state.editor);
	}

	render(){
		return(
			<textarea id='text-some' />
		)
	}
}

export default TinymceComponent;