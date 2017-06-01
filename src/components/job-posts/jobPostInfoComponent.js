import React from 'react';


class JobPostComponent extends React.Component{
    constructor(props){
        super(props);

    }


    render(){
        console.log("So we are here now with..", this.props.job);
        return (
            <div className="job-post">
               <h1 className="jp-job-header">{this.props.job.jobTitle }</h1>
                <div className="job-description" dangerouslySetInnerHTML={{__html: this.props.job.jobDescription}}></div>
                <button>Apply Now</button>
            </div>
        )
    }
}

export default JobPostComponent;