import React from 'react';

//utils
import {setFormState} from "../../../../utils/utils";

class createJobComponent extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            jobTitle: "",
            jobDescription: "",
            keywords: ""
        };
        
        this.handleJobSubmit = this.handleJobSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleJobSubmit(){
        console.log("jobData submitted:", this.state);
    }
    

    handleChange(state, key, event){
        
        this.setState(setFormState(state,key, event));
        
    }
    
    render(){
        return (
            <div>
               <h1>Create a new job post</h1>
                <form onSubmit={() => this.handleJobSubmit()}>
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
        )
    }
}

export default createJobComponent;