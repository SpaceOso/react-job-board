import * as React from 'react';

// components
import { Job } from '../../types/index';
import ModalComponent from '../modal/ModalComponent';
import { default as SpinnerComponent } from '../spinners/spinnerComponent';
import ApplicationComponent from './application/ApplicationComponent';

interface JobPostInfoProps {
  isFetching: boolean;
  job: Job;
  addApplicantToJob;
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
    return (
      <ApplicationComponent
        employerId={this.props.job.employerId}
        jobId={this.props.job.id}
        jobTitle={this.props.job.title}
        handleApplicantInfo={this.props.addApplicantToJob}
        cancelApplication={this.handleApplicationCancel}
      />
    );
  }

  handleApplicationCancel() {
    console.log('job application canceled');
    this.setState({ isApplying: false });
  }

  render() {
    console.log('jobPostInfoComponent job:', this.props.job);
    if (this.props.isFetching) {
      return <SpinnerComponent/>;
    } else {
      return (
        <div className="job-post">
          <div className="job-header-container panel-shadow">
            <h1 className="jp-job-header">{this.props.job.title}</h1>
          </div>
          <div className="job-description-container panel-shadow">
            <div
              className="job-description"
              dangerouslySetInnerHTML={{ __html: this.props.job.description }}
            />
            {this.state.isApplying === true ? this.displayJobApplication() : null}
            <button onClick={this.handleApplication}>Apply Now</button>
          </div>
        </div>
      );
    }

  }
}

export default JobPostInfoComponent;
