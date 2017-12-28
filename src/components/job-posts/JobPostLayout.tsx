import * as React from 'react';
import { RouteComponentProps } from 'react-router';
// import { CSSTransition } from 'react-transition-group';
import { CurrentJobPost } from '../../types/index';
import { default as SpinnerComponent } from '../spinners/spinnerComponent';
import { TransitionGroup } from 'react-transition-group';
import Fade from '../animations/Fade';
import JobPostEmployerInfoComponent from './employer-info/JobPostEmployerInfoComponent';
import JobPostInfoComponent from './JobPostInfoComponent';
import TestComponent from '../tests/TestComponent';

// styles
import './styles/JobPostContainer.scss';

import '../animations/animationStyles.scss';
import ApplicationComponent from './application/ApplicationComponent'

interface JobPostProps extends RouteComponentProps<any> {
  getJobById: (arg) => {};
  loadJob: () => {};
  resetCurrentJob: () => {};
  addApplicantToJob: (applicantInfo) => {};
  currentJobPost: CurrentJobPost;
}

interface MyState {
  jobInfoLoaded: boolean;
  currentJobPost: CurrentJobPost | null;
  isApplying: boolean;
  didApply: boolean;
}

class JobPostLayout extends React.Component<JobPostProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      jobInfoLoaded: false,
      currentJobPost: null,
      isApplying: false,
      didApply: false,
    };
    this.loadNewJob = this.loadNewJob.bind(this);
    this.handleJobApplicantInfo = this.handleJobApplicantInfo.bind(this);
    this.handleApplication = this.handleApplication.bind(this);
    this.displayJobApplication = this.displayJobApplication.bind(this);
    this.handleApplicationCancel = this.handleApplicationCancel.bind(this);
  }

  // gets called when this.state.isApplying === true
  displayJobApplication() {
    if (this.state.isApplying) {
      return (
        <ApplicationComponent
          employerId={this.props.currentJobPost.employerId}
          jobId={this.props.currentJobPost.id}
          jobTitle={this.props.currentJobPost.title}
          handleApplicantInfo={this.props.addApplicantToJob}
          cancelApplication={this.handleApplicationCancel}
          viewingApplication={this.state.isApplying}
        />
      );
    }
    return (
      <div style={{ display: 'none', position: 'absolute' }}/>
    );
  }

  shouldComponentUpdate() {
    console.log('yes');
    return true;
  }

  handleApplicationCancel() {
    console.log('job application canceled');
    this.setState({ isApplying: false });
  }

  // Will fire when apply button is clicked
  handleApplication() {
    console.log('application button clicked');
    if (this.state.isApplying === false) {
      this.setState({ isApplying: true });
    }
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
    // this.props.resetCurrentJob();
    this.props.getJobById(jobId);
  }

  handleJobApplicantInfo(data) {
    console.log('in the job post layout about to add applicant:', data);
    this.props.addApplicantToJob(data);
  }

  render() {

    console.log('layout, props.currentEmployer', this.props.currentJobPost);

    const jobPostInfoComponent = (
      <JobPostInfoComponent
        job={this.props.currentJobPost}
        addApplicantToJob={this.handleJobApplicantInfo}
        handleApplicationClick={this.handleApplication}
      />
    );

    return (
      <div className="job-post-container">
        <Fade key={'application-container'} in={this.state.isApplying}>
          {this.displayJobApplication()}
        </Fade>
        <Fade key={'post-container'} in={!this.props.currentJobPost.isFetching}>
          {jobPostInfoComponent}
        </Fade>
        <JobPostEmployerInfoComponent isFetching={this.props.currentJobPost.isFetching} employer={this.props.currentJobPost.Employer} loadJob={this.loadNewJob} currentJob={this.props.currentJobPost.id}/>
      </div>
    );

  }
}

export default JobPostLayout;
