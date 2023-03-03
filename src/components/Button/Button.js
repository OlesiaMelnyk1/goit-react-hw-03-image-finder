import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ text, type, loadMorePictures }) => {
  return (
    <button type={type} className={css.Button} onClick={loadMorePictures}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  loadMorePictures: PropTypes.func.isRequired,
};
