import React from 'react';

class createJobComponent extends React.Component{
    render(){
        return (
            <div>
                {console.log("create job component has been loaded")}
                I'm the create job component
                and there should be new stuff in here like all this cool stuff LOOK AT EM
                userID: {this.props.userId}
                employer: {this.props.employer.id}
            </div>
        )
    }
}

export default createJobComponent;