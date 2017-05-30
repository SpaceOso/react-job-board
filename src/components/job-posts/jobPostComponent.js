import React from 'react';

import jobPostComponent from './jobPostComponent.scss';

class JobPostComponent extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
    console.log("inside the job post component:", this.props);
        return (
            <div className="job-post">
                Need to create a container to make an API call to get this job info
                {/*I'm a job post component viewing job {this.props.job.jobId}*/}
            </div>
        )
    }
}

export default JobPostComponent;