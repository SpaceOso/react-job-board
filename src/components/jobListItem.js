import React from 'react';

//styles
import jobListItemStyles from '../styles/jobListItem.scss';

class JobListItem extends React.Component{
    constructor(props){
        super(props);

        console.log(this.props.job);
    }


    render(){
        let job = this.props.job;

        return (
            <div className="job-list-item">
                <h1>{job.jobTitle}</h1>
                <h2>{job.employerName}</h2>
                <img className="job-list-logo"
                     src={ job.employerLogo ?
                         job.employerLogo : "../assets/images/no-icon.svg"}
                />
                <p>{job.jobDescription}</p>
            </div>
        )
    }
}

export default JobListItem;