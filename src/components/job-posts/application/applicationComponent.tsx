import * as React from 'react';
import SimpleForm from "../../simple-form/simpleForm";

interface MyProps{
	jobId: string | null,
	jobTitle: string | null,
	employerId: string | null,
	handleApplicantInfo: (applicantInfo)=>{}
}

class ApplicationComponent extends React.Component<MyProps>{
	constructor(props){
		super(props);

		this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);
	}

	handleApplicationSubmit(data){

		/*We only get the info from the form here. We need to add the employer and jobId info to this.*/
		let updatedData = {
			...data,
			employerId: this.props.employerId,
			jobId: this.props.jobId
		};
		this.props.handleApplicantInfo(updatedData);
	}

	render(){
		return(
			<div>
				<SimpleForm header={`Apply to ${this.props.jobTitle}`}
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
					            	label: 'State',
						            required: true,
						            type: 'text',
						            placeHolder: 'state',
						            id: 'state'
					            },
					            {
					            	label: 'City',
						            required: true,
						            type: 'text',
						            placeHolder: 'city',
						            id: 'city'
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