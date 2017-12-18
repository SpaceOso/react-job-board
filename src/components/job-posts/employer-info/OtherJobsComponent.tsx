import * as React from 'react';
import { Employer } from '../../../types';
import { default as SpinnerComponent } from '../../spinners/spinnerComponent';
import JobLinkComponent from '../JobLinkComponent';

interface MyProps {
  employer: Employer;
  handleClick: (jobId) => void;
  currentJob?: string;
  isFetching: boolean;
}

function otherJobsComponent(props: MyProps) {

  function createJobList() {
    const employer: Employer = props.employer;
    if (props.isFetching) {
      return <SpinnerComponent/>;
    }
    if (employer.jobs !== undefined && employer.jobs !== null) {
      return employer.jobs.map((job) => {
        if (job.id !== props.currentJob) {
          return (
            <JobLinkComponent
              key={`${job.id}`}
              to={`/jobposts/${job.id}`}
              value={job.id}
              onClick={props.handleClick}
            >
              <li>{job.title}</li>
            </JobLinkComponent>
          );
        }
      });
    }
  }

  return (
    <div className="info-container panel-shadow">
      <h1 className="title">Other jobs by dddd{props.employer.name}</h1>
      <ul className="other-job-ul">
        {createJobList()}
      </ul>
    </div>
  );
}

export default otherJobsComponent;
