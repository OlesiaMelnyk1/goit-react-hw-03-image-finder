import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  image: { tags, webformatURL, largeImageURL },
  handleModal,
}) => {
  return (
    <img
      className={css.ImageGalleryItemImage}
      src={webformatURL}
      data-source={largeImageURL}
      alt={tags}
      onClick={handleModal}
    />
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  handleModal: PropTypes.func.isRequired,
};
