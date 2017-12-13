import * as React from 'react';
import { Link } from 'react-router-dom';
import { Employer } from '../../../types';

interface MyProps {
  employer: Employer;
  handleClick: (jobId) => void;
  currentJob?: string;
}

function otherJobsComponent(props: MyProps) {
  function handleClick(e) {
    console.log('handling click event...');
    console.log(typeof e);
  }

  function createJobList() {
    const employer: Employer = props.employer;

    if (employer.jobs !== undefined && employer.jobs !== null) {
      return employer.jobs.map((job) => {
        if (job.id !== props.currentJob) {
          return (
            <Link
              key={`${job.id}`}
              to={`/jobposts/${job.id}`}
              onClick={handleClick}
            >
              <li>{job.title}</li>
            </Link>
          );
        }
      });
    }
  }

  return (
    <div className="info-container panel-shadow">
      <h1 className="title">Other jobs by {props.employer.name}</h1>
      <ul className="other-job-ul">
        {createJobList()}
      </ul>
    </div>
  );
}

export default otherJobsComponent;