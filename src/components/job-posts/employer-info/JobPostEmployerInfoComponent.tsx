import * as React from 'react';

import { Employer } from '../../../types/index';
import { IMG_URL, LOCAL_URL } from '../../../utils/utils';
import OtherJobsComponent from './OtherJobsComponent';
import SocialMediaComponent from './SocialMediaComponent';

/**
 * Styles
 */
import '../styles/JobPostEmployerInfo.scss';

interface MyProps {
  isFetching: boolean;
  employer?;
  loadJob?: (arg: any) => (any);
  currentJob?: string;
}

class JobPostEmployerInfoComponent extends React.Component<MyProps, any> {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(jobId) {
    console.log('JOB ID:', jobId);
    if (this.props.loadJob !== undefined) {
      this.props.loadJob(jobId);
    }
  }

  render() {
    if (this.props.employer === undefined) {
      // return null;
    }

    const employer: Employer = this.props.employer;
    const logo = employer.logoImg.length > 0 ? `${IMG_URL}${employer.logoImg}` : `${LOCAL_URL}${require('../../../assets/images/no-icon.svg')}`;
    return (
      <aside className="jp-employer-aside">
        <img className="company-logo panel-shadow" src={logo} alt={`${employer.name} Logo`}/>
        <div className="info-container panel-shadow" id="about-section">
          <h1 className="title">About {employer.name}</h1>
          <p className="jp-employer-location">{`${employer.location.city}, ${employer.location.state}`}</p>
        </div>
        <SocialMediaComponent/>
        <OtherJobsComponent employer={employer} handleClick={this.handleClick} currentJob={this.props.currentJob}/>
      </aside>
    );
  }
}

export default JobPostEmployerInfoComponent;
