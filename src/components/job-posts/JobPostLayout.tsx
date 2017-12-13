import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { CurrentJobPost } from '../../types/index';
import { default as SpinnerComponent } from '../spinners/spinnerComponent';
import JobPostEmployerInfoComponent from './employer-info/JobPostEmployerInfoComponent';
import JobPostInfoComponent from './JobPostInfoComponent';

// styles
import './styles/JobPostContainer.scss';

interface JobPostProps extends RouteComponentProps<any> {
  // job: Job
  // employer: Employer,
  getJobById: (arg) => {};
  loadJob: () => {};
  resetCurrentJob: () => {};
  addApplicantToJob: (applicantInfo) => {};
  currentJobPost: CurrentJobPost;
}

interface MyState {
  // jobPostEmployerInfo: {
  //   employerName: string,
  //   employerLogo: string,
  //   employerId: string,
  // };
  jobInfoLoaded: boolean;
}

class JobPostLayout extends React.Component<JobPostProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      jobInfoLoaded: false,
    };
    this.loadNewJob = this.loadNewJob.bind(this);
    this.handleJobApplicantInfo = this.handleJobApplicantInfo.bind(this);
  }

  componentDidMount() {
    this.props.getJobById(this.props.match.params.jobId);
    this.setState({ jobInfoLoaded: true });
  }

  componentWillUnmount() {
    this.props.resetCurrentJob();
  }

  loadNewJob(jobId) {
    this.props.resetCurrentJob();
    this.props.getJobById(jobId);
  }

  handleJobApplicantInfo(data) {
    console.log('in the job post layout about to add applicant:', data);
    this.props.addApplicantToJob(data);
  }

  render() {

    console.log('layout, props.currentEmployer', this.props.currentJobPost.Employer);
    if (this.props.currentJobPost.isFetching === undefined || this.props.currentJobPost.isFetching === true) {
      return (
        <div className="job-post-container">
          <JobPostInfoComponent
            isFetching={this.props.currentJobPost.isFetching}
          />
          <JobPostEmployerInfoComponent isFetching={this.props.currentJobPost.isFetching} />
        </div>
      );
    }

    if (this.props.currentJobPost.Employer.name !== null) {
      return (
        <div className="job-post-container">
          <JobPostInfoComponent
            job={this.props.currentJobPost}
            isFetching={this.props.currentJobPost.isFetching}
            addApplicantToJob={this.handleJobApplicantInfo}
          />
          <JobPostEmployerInfoComponent isFetching={this.props.currentJobPost.isFetching} employer={this.props.currentJobPost.Employer} loadJob={this.loadNewJob} currentJob={this.props.currentJobPost.id}/>
        </div>
      );
    }
    return null;
  }
}

export default JobPostLayout;
