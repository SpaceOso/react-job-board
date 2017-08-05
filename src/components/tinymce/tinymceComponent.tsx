import * as React from 'react';
import * as TinyMCE from 'tinymce';

interface thisState{
	id: string,
	/**
	 * Function to call to set state with this
	 * components content
	 */
	onEditorChange,
};


class TinymceComponent extends React.Component<thisState, any>{
	constructor(props){
		super(props);

		this.state ={
			editor: null
		};

	};

	componentDidMount(){
		TinyMCE.init({
			selector: '#tiny-mce-editor',
			setup: editor => {
				this.setState({ editor });
				editor.on('keyup change', () =>{
					const content = editor.getContent();
					this.props.onEditorChange(content);
				})
			}
		});
	}

	componentWillUnmount(){
		TinyMCE.EditorManager.remove(this.state.editor);
	}

	render(){
		return(
			<textarea id='tiny-mce-editor' />
		)
	}
}

export default TinymceComponent;