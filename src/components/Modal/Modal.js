import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    const { handleModal } = this.props;
    window.addEventListener('keydown', handleModal);
  }
  componentWillUnmount() {
    const { handleModal } = this.props;
    window.removeEventListener('keydown', handleModal);
  }

  render() {
    const {
      data: { source, alt },
      handleModal,
    } = this.props;
    return (
      <div className={css.Overlay} onClick={handleModal}>
        <div className={css.Modal}>
          <img src={source} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  data: PropTypes.shape({
    source: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  handleModal: PropTypes.func.isRequired,
};
