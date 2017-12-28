import * as React from 'react';

// components
import { Job } from '../../types/index';
// import './styles/JobPostContainer.scss';

interface JobPostInfoProps {
  job: Job;
  addApplicantToJob?;
  handleApplicationClick: () => void;
}

class JobPostInfoComponent extends React.Component<JobPostInfoProps> {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('jobPostInfoComponent job:', this.props.job);

    if (this.props.job !== undefined) {
      return (
        <div className="job-post">
          <div className="job-header-container panel-shadow">
            <h1 className="jp-job-header">{this.props.job.title} @ <span className="italic">{this.props.job.Employer.name}</span></h1>
          </div>
          <div className="job-description-container panel-shadow">
            <div
              className="job-description"
              dangerouslySetInnerHTML={{ __html: this.props.job.description }}
            />
            <button className="btn-standard" onClick={this.props.handleApplicationClick}>Apply Now</button>
          </div>
        </div>
      );
    }

    return null;
  }

}

export default JobPostInfoComponent;
