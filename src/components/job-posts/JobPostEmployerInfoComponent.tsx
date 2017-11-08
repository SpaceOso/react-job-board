import * as React from 'react';

import { Employer } from '../../types/index';
import { IMG_URL, LOCAL_URL } from '../../utils/utils';
import JobLinkComponent from './JobLinkComponent';

/**
 * Styles
 */
import './styles/JobPostEmployerInfo.scss';

interface MyProps {
  employer;
  loadJob: (arg: any) => (any);
}

class JobPostEmployerInfoComponent extends React.Component<MyProps, any> {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(jobId) {
    console.log('JOB ID:', jobId);
    this.props.loadJob(jobId);
  }

  createJobList() {
    const employer: Employer = this.props.employer;

    if (employer.jobs !== undefined) {
      if (employer.jobs !== null) {
        return employer.jobs.map(job => (
          <JobLinkComponent
            key={`${job.id}`}
            to={`/jobposts/${job.id}`}
            onClick={this.handleClick}
            jobTitle={job.title}
            jobID={job.id}
          />
        ));
      }
    }

  }

  createSocialMediaLinks() {
    console.log('the social media links fo this accounta re..', this.props.employer);
    return (
      <ul className="social-lists">
        <li>
          <a href={`https://www.facebook.com/`} target="blank">
            <img src={`${LOCAL_URL}${require('../../assets/images/icon-facebook.svg')}`}/>
          </a>
        </li>
        <li>
          <a href={`https://www.twitter.com/`} target="blank">
            <img src={`${LOCAL_URL}${require('../../assets/images/icon-twitter.svg')}`}/>
          </a>
        </li>
        <li>
          <a href={`https://www.linkedin.com/`} target="blank">
            <img src={`${LOCAL_URL}${require('../../assets/images/icon-linkedin.svg')}`}/>
          </a>
        </li>
      </ul>
    );
  }

  render() {

    if (this.props.employer.name === null) {
      return null;
    }

    const employer: Employer = this.props.employer;
    const logo = employer.logoImg.length > 0 ? `${IMG_URL}${employer.logoImg}` : `${LOCAL_URL}${require('../../assets/images/no-icon.svg')}`;
    return (
      <aside className="jp-employer-aside">
        <img className="company-logo panel-shadow" src={logo} alt={`${employer.name} Logo`}/>
        <div className="info-container panel-shadow" id="about-section">
          <h1 className="title">About {employer.name}</h1>
          <p className="jp-employer-location">{`${employer.location.city},${employer.location.state}`}</p>
        </div>
        <div className="info-container panel-shadow">
          {this.createSocialMediaLinks()}
        </div>
        <div className="info-container panel-shadow">
          <h1 className="title">Other jobs by {employer.name}</h1>
          <ul className="other-job-ul">
            {this.createJobList()}
          </ul>
        </div>
      </aside>
    );
  }
}

export default JobPostEmployerInfoComponent;
