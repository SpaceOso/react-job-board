import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getJobById} from '../../actions/jobActions';

import JobPostComponent from './jobPostComponent';


class JobPostContainer extends React.Component{
    constructor(props){
        super(props);

        this.getJobData = this.getJobData.bind(this);
    }

    getJobData(){
        this.props.getJobById(this.props.match.params.jobId);
    }

    render(){
        return(
            <div>
                I'm the job post container
                <button onClick={this.getJobData}>GetJob</button>
                <JobPostComponent job={this.props.match.params}/>
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