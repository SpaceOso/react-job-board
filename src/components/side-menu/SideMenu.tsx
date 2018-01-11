import * as React from 'react';

import './SideMenu.scss';

interface MyProps {
  links: JSX.Element[];
  handleClick: () => void;
}

class SideMenu extends React.Component<MyProps, {}> {
  constructor(props) {
    super(props);

  };

  render() {

    return (
      <div className={'side-menu'} onClick={this.props.handleClick}>
        {this.props.links}
      </div>
    );
  }
}

export default SideMenu;
