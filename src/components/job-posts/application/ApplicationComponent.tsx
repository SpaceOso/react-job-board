import * as React from 'react';
import SimpleForm from "../../simple-form/SimpleForm";

interface MyProps {
	jobId: string | null,
	jobTitle: string | null,
	employerId: string | null,
	handleApplicantInfo: (applicantInfo) => {}
}

class ApplicationComponent extends React.Component<MyProps> {
	constructor(props) {
		super(props);

		this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);
	}

	handleApplicationSubmit(data) {
		console.log("data from job application...", data);
		/*We only get the info from the form here. We need to add the employer and jobId info to this.*/
		let updatedData = {
			...data,
			employerId: this.props.employerId,
			jobId: this.props.jobId
		};
		this.props.handleApplicantInfo(updatedData);
	}

	render() {
		return (
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
						            label: 'Zip',
						            required: true,
						            type: 'text',
						            placeHolder: 'zip',
						            id: 'zip'
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
						            label: 'website',
						            required: false,
						            type: 'text',
						            placeHolder: 'www.yourwebsite.com',
						            id: 'website',
					            },
					            {
						            label: 'linkedIn',
						            required: false,
						            type: 'text',
						            placeHolder: 'www.yourlinkedin.com',
						            id: 'linkedin',
					            },
					            {
					            	label: 'github',
						            required: false,
						            type: 'text',
						            placeHolder: 'www.yourgithub.com',
						            id: 'github'
					            },
					            {
					            	label: 'Resume',
						            required: true,
						            type: 'file',
						            name: 'resume',
						            accept: '.pdf',
						            placeHolder: 'upload your resume',
						            id: 'resume'
					            },
					            {
						            label: 'Cover Letter',
						            required: false,
						            type: 'file',
						            accept: '.pdf',
						            placeHolder: 'upload your resume',
						            id: 'coverLetter'
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