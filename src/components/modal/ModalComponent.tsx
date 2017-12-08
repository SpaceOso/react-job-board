import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom';

// These two containers are siblings in the DOM
// const appRoot = document.getElementById('root');
// const modalRoot = document.getElementById('modal-root');

interface MyProps {
  modalRoot
}

class ModalComponent extends React.Component {
  el: HTMLElement;
  appRoot: HTMLElement | null;
  modalRoot: HTMLElement | null;

  constructor(props) {
    super(props);

    this.el = document.createElement('h1');
    this.appRoot = document.getElementById('root');
    this.modalRoot = document.getElementById('modal-root');
  }

  componentDidMount() {
    if (this.modalRoot !== null) {
      console.log('appending..');
      this.modalRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (this.modalRoot !== null) {
      console.log('removing...');
      this.modalRoot.removeChild(this.el);
    }
  }

  render() {
    return (
      <div>
        I'm the modal component
      </div>
    );
  }
}

export default ModalComponent;