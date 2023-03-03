import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ text, type, onLoadMorePics }) => {
  return (
    <button type={type} className={css.Button} onClick={onLoadMorePics}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onLoadMorePics: PropTypes.func.isRequired,
};
