import React from 'react';

//styles
import jobListItemStyles from '../styles/jobListItem.scss';

class JobListItem extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.job);
    }


    render() {
        let job = this.props.job;

        return (
            <div className="job-list-item">
                <div className="job-list-logo">
                    <img className="job-list-logo"
                         src={ job.employerLogo ?
                             job.employerLogo : "../assets/images/no-icon.svg"}
                    />
                </div>
                <div className="job-list-info">
                    <h1 className="job-title">{job.jobTitle}</h1>
                    <h2 className="job-employer">{job.employerName}</h2>
                    <p className="job-description" dangerouslySetInnerHTML={{__html: job.jobDescription}}></p>
                    {/*<p className="job-description">{job.jobDescription}</p>*/}
                </div>
            </div>
        )
    }
}

export default JobListItem;