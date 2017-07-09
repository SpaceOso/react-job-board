import React from 'react';

class EditJobsContainer extends React.Component{
    constructor(props){
        super(props);

        this.displayJobList = this.displayJobList.bind(this);
    }

    /*This will check to see if the employer has any job posts, if it does it will create a list of job posts. If not it should
    * display a message saying that they will be posted here once there is some.*/
    displayJobList(){
        return this.props.jobs.length > 0 ? `You have this many job posts..${this.props.jobs.length}` : `We will display your job posts here once you submit some`;
    }

    render(){
        console.log("the props in edit jobs container..", this.props);
        return(
            <div>
                <h1>I'm the Edit Jobs Container</h1>
                <p>{this.displayJobList()}</p>
                {/*TODO we will need a list of jobs that we can edit.
                We will need to edit the title of the jobs.
                the description of the job.
                the keywords of the job and be able to delete the job.*/}
            </div>
        )
    }
}

export default EditJobsContainer;