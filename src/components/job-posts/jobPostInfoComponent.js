import React from 'react';

//components
import SpinnerComponent from '../spinners/spinnerComponent';

class JobPostComponent extends React.Component{
    constructor(props){
        super(props);
        this.dataReady = this.dataReady.bind(this);
    }
	
	dataReady = () => this.props.isFetching !== true;
    
    render(){
        if(this.props.isFetching){
            return <SpinnerComponent/>
        } else {
	        return (
                <div className="job-post">
                    <h1 className="jp-job-header">{this.props.job.jobTitle }</h1>
                    <div className="job-description" dangerouslySetInnerHTML={{__html: this.props.job.jobDescription}}></div>
                    <button>Apply Now</button>
                </div>
	        )
        }
        
    }
}

export default JobPostComponent;