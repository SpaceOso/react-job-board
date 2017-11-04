import * as React from 'react';

// styles
import { Redirect, RouteComponentProps } from 'react-router';
import { User } from '../../../types/index';
import SimpleForm from '../../simple-form/SimpleForm';
import { default as SpinnerComponent } from '../../spinners/spinnerComponent';
import './styles/CompRegisterComponent.scss';

interface CompRegisterProps extends RouteComponentProps<any> {
  submitData;
  user: User;
}

interface MyState {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  logoImg: File | null;
  website: string;
  facebook: string;
  linkedIn: string;
  twitter: string;
}

class CompRegisterComponent extends React.Component<CompRegisterProps, MyState> {
  private filesInput: HTMLInputElement;
  private infoInputs = [
    {
      label: 'Company Name',
      required: true,
      type: 'text',
      placeHolder: 'Enter company name',
      id: 'company-name',
    },
    {
      label: 'Company logo:',
      required: false,
      type: 'file',
      name: 'company-logo',
      accept: 'image/gif, image/png, image/jpeg',
      placeHolder: 'Upload company logo',
      id: 'company-logo',
    },
  ];
  private socialInputs = [
    {
      label: 'Company Website',
      required: true,
      type: 'text',
      placeHolder: 'website',
      id: 'company-website',
    },
    {
      label: 'twitter',
      required: false,
      type: 'text',
      placeHolder: 'twitter',
      id: 'company-twitter',
    },
    {
      label: 'facebook',
      required: false,
      type: 'text',
      placeHolder: 'facebook',
      id: 'company-facebook',
    },
    {
      label: 'linkedin',
      required: false,
      type: 'text',
      placeHolder: 'linkedin',
      id: 'company-linkedIn',
    },
  ];

  private locationInputs = [
    {
      label: 'address:',
      required: true,
      type: 'text',
      placeHolder: 'address',
      id: 'company-address',
    },
    {
      label: 'city:',
      required: true,
      type: 'text',
      placeHolder: 'text',
      id: 'company-city',
    },
    {
      label: 'state:',
      required: true,
      type: 'text',
      placeHolder: 'state',
      id: 'company-state',
    },
    {
      label: 'zip',
      required: true,
      type: 'text',
      placeHolder: 'zip',
      id: 'company-zip',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      logoImg: null,
      website: '',
      facebook: '',
      linkedIn: '',
      twitter: '',
    };

    this.sendRegistrationToServer = this.sendRegistrationToServer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEmployerSubmit = this.handleEmployerSubmit.bind(this);
    this.renderRegisterForm = this.renderRegisterForm.bind(this);
  }

  /**
   * This well send the update state to the back end
   */
  sendRegistrationToServer(file: File | null) {
    this.props.submitData(this.state, file);
  }

  handleEmployerSubmit(event) {
    (event as Event).preventDefault();

    /** If there was a file uploaded update logoImg state property */
    if (this.filesInput.files !== null) {
      if (this.filesInput.files.length > 0) {
        this.sendRegistrationToServer(this.filesInput.files[ 0 ]);
      } else {
        this.sendRegistrationToServer(null);
      }
    }

  }

  handleChange(key, event) {
    const keyObject = { ...this.state };

    keyObject[ key ] = event;

    this.setState(keyObject);
  }

  renderRegisterForm() {
    return (
      <div className="comp-register">
        <h1>We need to set up your employer before we can start!</h1>
        {/*<div><img src="/public/assets/uploads/k2cjh.jpg" alt=""/></div>*/}
        <div className="form-container">
          <div id="location-group">
            <h3>tester</h3>
            <SimpleForm
              header={'location'}
              inputs={this.infoInputs}
              submitBtnText={'Enter Company'}
              verifyInputs={null}
              onSubmitCB={this.handleEmployerSubmit}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.user.isFetching) {
      return <SpinnerComponent/>;
    }

    if (this.props.user.employerId !== null) {
      return <Redirect to={`${'/user/dashboard/'}${this.props.user.id}/home `}/>;
    }

    return this.renderRegisterForm();
  }
}

export default CompRegisterComponent;
