import React from 'react';

import jobPostComponent from './jobPostComponent.scss';

class JobPostComponent extends React.Component{
    constructor(props){
        super(props);

        console.log("JobPostcomponent props:", this.props.job);
        
    }
    
    render(){
    console.log("inside the job post component:", this.props.job);
        return (
            <div className="job-post">
               <h1>You are viweing job {this.props.job !== null ? this.props.job.jobTitle : ''}</h1>
            </div>
        )
    }
}

export default JobPostComponent;