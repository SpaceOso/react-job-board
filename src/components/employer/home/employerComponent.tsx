import * as React from 'react';
import {Link} from 'react-router-dom';

//styles
import "./styles/employerComponent.scss";

class EmployerComponent extends React.Component<Object> {
    render() {
        return (
            <div className="employer-component">
                I'm the employerComponent I'm probably going to be a smart component
                <button>
                    <Link to="/register">
                        Click here to sign up
                    </Link>
                </button>
            </div>
        )
    }
}

export default EmployerComponent;