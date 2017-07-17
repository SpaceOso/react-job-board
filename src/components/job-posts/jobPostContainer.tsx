import * as React from 'react';
import {connect} from 'react-redux';
//styles
import './styles/jobPostContainer.scss';
//components
import JobPostLayout from "./jobPostLayout";
import {getJobById, resetCurrentJob} from "../../actions/jobActions";
import {StoreState} from "../../types/index";

function mapStateToProps({currentJobPost, employer}:StoreState) {
// function mapStateToProps(store:StoreState) {

    console.log("container map state to props currentjob", currentJobPost);
    console.log("container map state to props employer", employer);

    return {
        currentJobPost,
        employer
    }
}

const mapDispatchToProps = (dispatch) =>({
    getJobById: (jobId)=>{dispatch(getJobById(jobId))},
    resetCurrentJob: ()=>{dispatch(resetCurrentJob())},
});

export default connect(mapStateToProps, mapDispatchToProps)(JobPostLayout);