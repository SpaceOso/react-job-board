import React from 'react';

import './styles/spinnerComponent.scss';

class SpinnerComponent extends React.Component {
    render() {
        return (
                <div className="loader">
                    Loading your data...
                </div>
        )
    }
}

export default SpinnerComponent;