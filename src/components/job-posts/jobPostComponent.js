import React from 'react';

import jobPostComponent from './jobPostComponent.scss';

class JobPostComponent extends React.Component{
    render(){
    console.log("inside the job post component:", this.props.match);
        return (
            <div className="job-post">
                Need to create a container to make an API call to get this job info
                I'm a job post component viewing job {this.props.match.params.jobId}
            </div>
        )
    }
}

export default JobPostComponent;