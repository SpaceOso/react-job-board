import React from 'react';

import './styles/spinnerComponent.scss';

class SpinnerComponent extends React.Component {
    render() {
        return (
            <div>
                <div className="loader">
                    Loading your data...
                </div>
            </div>
        )
    }
}

export default SpinnerComponent;