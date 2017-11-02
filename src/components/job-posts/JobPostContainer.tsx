import * as React from 'react';
import {connect} from 'react-redux';
//styles
import './styles/JobPostContainer.scss';
//components
import JobPostLayout from "./JobPostLayout";
import {addApplicantToJob, getJobById, resetCurrentJob} from "../../actions/jobActions";
import {StoreState} from "../../types/index";

function mapStateToProps({currentJobPost}:StoreState) {

    return {
        currentJobPost
    }
}

const mapDispatchToProps = (dispatch) =>({
    getJobById: (jobId)=>{dispatch(getJobById(jobId))},
    resetCurrentJob: ()=>{dispatch(resetCurrentJob())},
	addApplicantToJob: (applicantInfo)=>{dispatch(addApplicantToJob(applicantInfo))}
});

export default connect(mapStateToProps, mapDispatchToProps)(JobPostLayout);