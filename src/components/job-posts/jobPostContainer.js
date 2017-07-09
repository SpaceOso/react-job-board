import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getJobById, resetCurrentJob} from '../../actions/jobActions';

import JobPostInfoComponent from './jobPostInfoComponent';
import JobPostEmployerInfoComponent from "./jobPostEmployerInfoComponent";
import SpinnerComponent from '../spinners/spinnerComponent';

import './styles/jobPostContainer.scss';

class JobPostContainer extends React.Component{
    constructor(props){
        super(props);
        this.dataReady = this.dataReady.bind(this);
        this.loadNewJob = this.loadNewJob.bind(this);
    }

    componentDidMount(){
		this.props.getJobById(this.props.match.params.jobId);
    }
	
	componentWillUnmount(){
		this.props.resetCurrentJob();
    }

    loadNewJob(jobId){
        // this.props.resetCurrentJob();
        this.props.getJobById(jobId);
    }
    
    dataReady = () => this.props.currentJob.job !== null;
	
	componentWillReceiveProps(nextProps){
	   
    }
    render(){
        
        let componentToRender = {};
        if(!this.dataReady()){
            componentToRender = <SpinnerComponent/>
        } else {
            componentToRender = (
                <div className="job-post-container">
                    <h1>Inside the job post container</h1>
                    <JobPostInfoComponent job={this.props.currentJob.job} isFetching={this.props.currentJob.isFetching}/>
                    <JobPostEmployerInfoComponent employer={this.props.currentJob.employer} loadJob={this.loadNewJob} />
                </div>
            )
        }
        
        return(componentToRender)
    }
}

function mapStateToProps(state) {
    return {currentJob: state.currentJob}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getJobById, resetCurrentJob }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobPostContainer);