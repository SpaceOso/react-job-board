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

class JobPostInfoComponent extends React.Component<JobPostInfoProps, any> {
  constructor(props) {
    super(props);

    this.dataReady = this.dataReady.bind(this);
  }

  dataReady = () => this.props.isFetching !== true;

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
            <ApplicationComponent
              employerId={this.props.job.employerId}
              jobId={this.props.job.id}
              jobTitle={this.props.job.title}
              handleApplicantInfo={this.props.addApplicantToJob}
            />
            <ModalComponent/>
            <button>Apply Now</button>
          </div>
        </div>
      );
    }

  }
}

export default JobPostInfoComponent;
