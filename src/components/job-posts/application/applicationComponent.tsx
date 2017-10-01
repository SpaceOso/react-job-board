import * as React from 'react';
import SimpleForm from "../../simple-form/simpleForm";

interface MyProps{
	jobId: string | null,
	employerId: string | null,
}

class ApplicationComponent extends React.Component<MyProps>{
	constructor(props){
		super(props);

		this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);
	}

	handleApplicationSubmit(data){
		console.log("this job id:", this.props.jobId);
		console.log("this job employer:", this.props.employerId);
		console.log("You have applied to this job!!", data);
	}

	render(){
		return(
			<div>
				<SimpleForm header={"Apply to this job"}
				            inputs={[
					            {
						            label: 'First Name',
						            required: true,
						            type: 'text',
						            placeHolder: 'First Name',
						            id: 'fName'
					            },
					            {
					            	label: 'Last Name',
						            required: true,
						            type: 'text',
						            placeHolder: 'Last Name',
						            id: 'lName',
					            },
					            {
					            	label: 'email',
						            required: true,
						            type: 'text',
						            placeHolder: 'email',
						            id: 'email'
					            },
					            {
						            label: 'Home Phone',
						            required: true,
						            type: 'tel',
						            placeHolder: '555-555-555',
						            id: 'homePhone'
					            },
					            {
						            label: 'Cell Phone',
						            required: true,
						            type: 'tel',
						            placeHolder: '555-555-555',
						            id: 'cellPhone'
					            },
					            {
					            	label: 'Cover Letter',
						            required: false,
						            type: 'text',
						            placeHolder: '',
						            id:'coverLetter'
					            }
				            ]}
				            submitBtnText={'Submit Application'}
				            verifyInputs={null}
				            onSubmitCB={this.handleApplicationSubmit}/>
				I'm the application component
			</div>
		)
	}
}

export default ApplicationComponent;