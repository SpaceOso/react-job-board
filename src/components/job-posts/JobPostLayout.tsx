import * as React from 'react';
import { RouteComponentProps } from 'react-router';
// import { CSSTransition } from 'react-transition-group';
import { CurrentJobPost } from '../../types/index';
import { default as SpinnerComponent } from '../spinners/spinnerComponent';
import JobPostEmployerInfoComponent from './employer-info/JobPostEmployerInfoComponent';
import JobPostInfoComponent from './JobPostInfoComponent';

// styles
import './styles/JobPostContainer.scss';
import TestComponent from '../tests/TestComponent'

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
  currentJobPost: CurrentJobPost | null;
}

class JobPostLayout extends React.Component<JobPostProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      jobInfoLoaded: false,
      currentJobPost: null,
    };
    this.loadNewJob = this.loadNewJob.bind(this);
    this.handleJobApplicantInfo = this.handleJobApplicantInfo.bind(this);
  }

  componentDidMount() {
    this.props.getJobById(this.props.match.params.jobId);
  }

  componentWillReceiveProps() {
    this.setState({
      jobInfoLoaded: true,
      currentJobPost: this.props.currentJobPost,
    });
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

    console.log('layout, props.currentEmployer', this.props.currentJobPost);
    // if (this.props.currentJobPost.isFetching === undefined || this.props.currentJobPost.isFetching === true) {
    if (this.state.currentJobPost === null) {
      return (
       null
      );
    }

    if (this.props.currentJobPost.Employer !== null) {
      return (
        <div className="job-post-container">
          {/*<CSSTransition classNames={'tester'} timeout={500}/>*/}
          <TestComponent/>
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
