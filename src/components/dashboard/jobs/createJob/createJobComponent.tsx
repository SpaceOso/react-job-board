import * as React from 'react';

//utils
import {setFormState} from "../../../../utils/utils";
import SpinnerComponent from "../../../spinners/spinnerComponent";
import {SiteFetching} from "../../../../types/index";
import {SyntheticEvent} from "react";


interface MyProps{
    submitJobPost,
    siteFetching: SiteFetching,
    employer,
    userId
}

interface MyState{
    jobTitle: string,
    jobDescription: string,
    keywords: string[]
}

class CreateJobComponent extends React.Component<MyProps, MyState>{
    constructor(props){
        super(props);
        
        this.state = {
            jobTitle: "",
            jobDescription: "",
            keywords: []
        };
        
        this.handleJobSubmit = this.handleJobSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleJobSubmit(event:any): void{
        console.log("handleJobSubmit() before event what is this it:", event);
        // (event as React.SyntheticEvent<Event>).preventDefault();
	    console.log("handleJobSubmit() after");
        this.props.submitJobPost({...this.state, employerId: this.props.employer});
	    // event.preventDefault();
    }

    handleChange(state, key, event){
        this.setState(setFormState(state,key, event));
    }
    
    render(){
        let spinner = (<SpinnerComponent/>);
        let form = (
            <div>
               <h1>Create a new job post</h1>
                <form onSubmit={this.handleJobSubmit}
                >
                    <div>
                        <label htmlFor="job-title">Job Title</label>
                        <input type="text"
                               id="job-title"
                               placeholder="Enter Job Title"
                               value={this.state.jobTitle}
                               onChange={(event) => this.handleChange(this.state, "jobTitle", event.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="job-description">Job Description</label>
                        <input type="text"
                               id="job-description"
                               placeholder="Enter Job Description"
                               value={this.state.jobDescription}
                               onChange={(event) => this.handleChange(this.state, "jobDescription", event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="keywords">Enter keywords</label>
                        <input type="text"
                               id="keywords"
                               placeholder="Enter keywords"
                               value={this.state.keywords}
                               onChange={(event) => this.handleChange(this.state, "keywords", event.target.value)}
                        />
                    </div>
                    <button>Submit Job</button>
                </form>
            </div>
        );

        return(
            <div>
                {this.props.employer.isFetching ? spinner : form}
                {/*{form}*/}
            </div>
        )
    }
}

export default CreateJobComponent;