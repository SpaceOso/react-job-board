import * as React from 'react';
import {StoreState} from "../../../../types/index";
import {connect} from "react-redux";
import EditJobsLayout from "./editJobsLayout";
import {fetchAllEmployerJobModels} from "../../../../actions/employerDashboardActions";

function mapStateToProps({jobs, employer}:StoreState){
    return {
        employer,
        jobs
    }
}

const mapDispatchToProps = (dispatch) => ({
	fetchAllEmployerJobModels : (employerId: string) => dispatch(fetchAllEmployerJobModels(employerId))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditJobsLayout);