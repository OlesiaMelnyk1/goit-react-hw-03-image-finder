import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ pictures, ...otherProps }) => {
  return (
    <section>
      <ul className={css.ImageGallery}>
        {pictures.map(picture => (
          <li className={css.ImageGalleryItem} key={picture.id}>
            <ImageGalleryItem image={picture} {...otherProps} />
          </li>
        ))}
      </ul>
    </section>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
};
