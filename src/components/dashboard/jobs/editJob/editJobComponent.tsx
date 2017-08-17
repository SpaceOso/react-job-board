import * as React from 'react';
import {Job} from "../../../../types/index";
import TinymceComponent from "../../../tinymce/tinymceComponent";

interface myProps {
	job: Job | null,
}

interface myState{
	jobDescription: any
}


class EditJobComponent extends React.Component<myProps, myState> {
	constructor(props){
		super(props);

		this.state = {
			jobDescription: ''
		};

		this.handleJobDescriptionChange = this.handleJobDescriptionChange.bind(this);
	}

	handleJobDescriptionChange(content){
		console.log("setting job description content with:", content);
		this.setState({jobDescription: content});
	}
	render() {
		return (
			<div>I"m the edit jobs component
				{<h1>{this.props.job!.jobTitle}</h1>}
				{<p>{this.props.job!.jobDescription}</p>}
				<TinymceComponent id="job-edit"
				                  onEditorChange={this.handleJobDescriptionChange}
				                  priorContent={this.props.job!.jobDescription}
				/>
			</div>
		)
	}
}

export default EditJobComponent;