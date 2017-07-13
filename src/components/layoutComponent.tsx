import * as React from 'react';

import HeaderComponent from './header/headerComponent';
import {FooterComponent} from './footer/footerComponent';
import {User} from "../types/index";

interface Props{
    user: User,
}

class LayoutComponent extends React.Component<Props> {
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