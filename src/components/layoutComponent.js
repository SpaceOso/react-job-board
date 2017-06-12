import React from 'react';

import HeaderComponent from './header/headerComponent';
import {JumboTron} from './home/jumboTron';
import {FooterComponent} from './footer/footerComponent';

class LayoutComponent extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>
                <HeaderComponent user={this.props.user}/>
                {this.props.children}
                <FooterComponent/>
            </div>
        )
    }
}

export default LayoutComponent;