import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {getJobs} from '../../../actions/jobActions';

//constants
// import constants from '../../../actions/index';

//style
import './joblistContainer.scss';

//component
import JobListComponent from './jobListComponent';

//interfaces
import { StoreState} from "../../../types/index";

function mapPropsToState(store: StoreState) {
	return {jobs: store.jobs};
}

const mapDispatchToProps = (dispatch) =>({
	getJobs: () => dispatch(getJobs())
});

export default connect(mapPropsToState, mapDispatchToProps)(JobListComponent);