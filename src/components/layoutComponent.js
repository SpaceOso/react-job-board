import React from 'react';

import {HeaderComponent} from './header/headerComponent';
import {JumboTron} from './home/jumboTron';
import {FooterComponent} from './footer/footerComponent';

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