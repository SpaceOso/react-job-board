import * as React from 'react';

import './styles/spinnerComponent.scss';

function SpinnerComponent () {
        return (
            <div className="spinner-component">
                <div className="loader">
                    Loading your data...
                </div>
            </div>

        )
}

export default SpinnerComponent;