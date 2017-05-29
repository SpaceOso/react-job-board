import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getJobs} from '../../../actions/jobActions';

//style
import jobListStyles from './joblistContainer.scss';

//component
import JobListItem from './jobListItemComponent';

class JobListContainer extends React.Component {
	constructor(props) {
		super(props);

		this.returnJobList = this.returnJobList.bind(this);
		this.getJobs = this.getJobs.bind(this);
	}

	returnJobList(job) {
		let currentJob = this.props.jobs[job];
		return (
		    <JobListItem key={currentJob._id} job={currentJob}/>
		)
	}

	componentDidMount() {
		this.props.getJobs();
	}

	getJobs() {
		this.props.getJobs();
	}


	render() {
		return (
			<div className="joblist-container">
				{Object.keys(this.props.jobs).map(job => this.returnJobList(job))}
			</div>
		)
	}
}
;

function mapPropsToState(state) {
	return {jobs: state.jobs};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getJobs}, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(JobListContainer);