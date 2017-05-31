import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getJobById} from '../../actions/jobActions';

import JobPostInfoComponent from './jobPostInfoComponent';
import JobPostEmployerInfoComponent from "./jobPostEmployerInfoComponent";

class JobPostContainer extends React.Component{
    constructor(props){
        super(props);

        // this.getJobData = this.getJobData.bind(this);
        
	    // this.getJobData(this.props.match.params.jobId);
     
    }
	
	componentDidMount(){
        console.log("DidMount with:", this.props.match.params.jobId);
		this.props.getJobById(this.props.match.params.jobId);
    }

    // getJobData(){
    //     this.props.getJobById(this.props.match.params.jobId);
    // }

    render(){
        return(
            <div>
                I'm the job post container
                <button onClick={this.getJobData}>GetJob</button>
                <JobPostInfoComponent job={this.props.currentJob.job}/>
                <JobPostEmployerInfoComponent />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {currentJob: state.currentJob}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getJobById}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobPostContainer);