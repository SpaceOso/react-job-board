import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getJobById} from '../../actions/jobActions';

import JobPostInfoComponent from './jobPostInfoComponent';
import JobPostEmployerInfoComponent from "./jobPostEmployerInfoComponent";
import SpinnerComponent from '../spinners/spinnerComponent';

class JobPostContainer extends React.Component{
    constructor(props){
        super(props);
        this.dataReady = this.dataReady.bind(this);
    }

    componentDidMount(){
		this.props.getJobById(this.props.match.params.jobId);
    }

    dataReady(){
        if(!this.props.currentJob.job){
            return <SpinnerComponent />
        } else{
            return (
                <div>
                    <JobPostInfoComponent job={this.props.currentJob.job}/>
                    <JobPostEmployerInfoComponent employer={this.props.currentJob.employer} />
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                {this.dataReady()}
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