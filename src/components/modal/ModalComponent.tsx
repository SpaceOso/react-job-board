import * as React from 'react';
import * as ReactDOM from 'react-dom';

// styles
import './ModalComponent.scss';

const modalParent = document.getElementById('modal-root');

class ModalComponent extends React.Component<any> {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      ReactDOM.createPortal(this.props.children, modalParent as Element)
    );

  }
}

export default ModalComponent;
