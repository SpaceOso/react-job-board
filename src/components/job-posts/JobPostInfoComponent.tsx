import * as React from 'react';

// components
import { Job } from '../../types/index';
import Fade from '../animations/Fade';
import { default as SpinnerComponent } from '../spinners/spinnerComponent';
import ApplicationComponent from './application/ApplicationComponent';
import { TransitionGroup } from 'react-transition-group';
import TestComponent from '../tests/TestComponent';

// import './styles/JobPostContainer.scss';

interface JobPostInfoProps {
  isFetching: boolean;
  job: Job;
  addApplicantToJob?;
}

interface MyState {
  isApplying: boolean;
  didApply: boolean;
}

class JobPostInfoComponent extends React.Component<JobPostInfoProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      isApplying: false,
      didApply: false,
    };
    this.dataReady = this.dataReady.bind(this);
    this.displayJobApplication = this.displayJobApplication.bind(this);
    this.handleApplication = this.handleApplication.bind(this);
    this.handleApplicationCancel = this.handleApplicationCancel.bind(this);
  }

  dataReady = () => this.props.isFetching !== true;

  // Will fire when apply button is clicked
  handleApplication() {
    console.log('application button clicked');
    if (this.state.isApplying === false) {
      this.setState({ isApplying: true });
    }
  }

  // gets called when this.state.isApplying === true
  displayJobApplication() {
    if (this.state.isApplying) {
      return (
        <ApplicationComponent
          employerId={this.props.job.employerId}
          jobId={this.props.job.id}
          jobTitle={this.props.job.title}
          handleApplicantInfo={this.props.addApplicantToJob}
          cancelApplication={this.handleApplicationCancel}
          viewingApplication={this.state.isApplying}
        >
          tester div
        </ApplicationComponent>
      );
    }
  }

  handleApplicationCancel() {
    console.log('job application canceled');
    this.setState({ isApplying: false });
  }

  render() {
    console.log('jobPostInfoComponent job:', this.props.job);

    if (this.props.job !== undefined) {
      return (
        <div className="job-post">
          <div className="job-header-container panel-shadow">
            <h1 className="jp-job-header">{this.state.isApplying}{this.props.job.title} @ <span className="italic">{this.props.job.Employer.name}</span></h1>
          </div>
          <div className="job-description-container panel-shadow">
            <div
              className="job-description"
              dangerouslySetInnerHTML={{ __html: this.props.job.description }}
            />
            {this.displayJobApplication()}
            <button className="btn-standard" onClick={this.handleApplication}>Apply Now</button>
          </div>
        </div>
      );
    }

    return null;
  }

}

export default JobPostInfoComponent;
