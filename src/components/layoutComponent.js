import React from 'react';

import {HeaderComponent} from './headerComponent';
import {JumboTron} from './jumboTron';
import {FooterComponent} from './footerComponent';

class LayoutComponent extends React.Component {
    render() {
        return (
            <div>
                <HeaderComponent/>
                {this.props.children}
                <FooterComponent/>
            </div>
        )
    }
}

export default LayoutComponent;