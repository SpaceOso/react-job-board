import React from 'react';

export const HeaderComponent = (props) => {
    return (
        <div className="header-component">
            <div id="header-logo">
                <h1>Job Board</h1>
            </div>
            <div className="nav-item">
                Job Seeker
            </div>
            <div className="nav-item">
                Employers
            </div>
        </div>
    )
};