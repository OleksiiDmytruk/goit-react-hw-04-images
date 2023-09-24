import { Component } from 'react';
import { Overlay, ModalPortal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscape);
  }

  onEscape = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeOnBaackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }

  render() {
    return (
      <Overlay onClick={this.closeOnBaackdropClick}>
        <ModalPortal>
          <img src={this.props.url} alt="" />
        </ModalPortal>
      </Overlay>
    );
  }
}
