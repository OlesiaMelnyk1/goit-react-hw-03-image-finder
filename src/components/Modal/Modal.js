import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = event => {
    if (event.code === 'Escape') {
      this.props.handleModal();
    }
  };
  handleOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.handleModal();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleOverlay}>
        <div className={css.Modal}>
          <img src={this.props.largeImage} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleModal: PropTypes.func.isRequired,
};
