import * as React from 'react';
import {StoreState} from "../../../../types/index";
import {connect} from "react-redux";
import EditJobsComponent from "./editJobsComponent";


function mapStateToProps({jobs, employer}:StoreState){
    return {
        employer,
        jobs
    }
}


export default connect(mapStateToProps, {})(EditJobsComponent);