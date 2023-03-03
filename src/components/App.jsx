import { Component } from 'react';
import { fetchImages } from './services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    text: '',
    page: 1,
    images: [],
    largeImage: '',
    isLoading: false,
    isModalOpen: false,
    error: false,
    showLoadMoreButton: false,
  };

  async componentDidUpdate(_, prevState) {
    const { text, page } = this.state;
    if (prevState.text !== text || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const { hits, totalHits } = await fetchImages(text, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          showLoadMoreButton: page < Math.ceil(totalHits / 12),
        }));
        if (hits.length === 0) {
          return alert('Nothing found for your request. Please, try again');
        }
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  searchImages = text => {
    if (this.state.text === text.trim()) {
      return alert('Pictures have already been found for your request');
    }
    this.setState({
      text,
      page: 1,
      images: [],
      error: false,
      isLoading: false,
      showLoadMoreButton: false,
    });
  };

  loadMorePictures = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onItemClick = largeImage => {
    this.setState({
      isModalOpen: true,
      largeImage,
    });
  };

  handleModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      images,
      largeImage,
      isLoading,
      isModalOpen,
      error,
      showLoadMoreButton,
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchImages} />
        {error === true
          ? alert('Sorry, an error occurred! Please try again later')
          : images.length > 0 && (
              <ImageGallery pictures={images} onItemClick={this.onItemClick} />
            )}
        {isLoading === true ? (
          <Loader />
        ) : (
          showLoadMoreButton && (
            <Button
              type="button"
              text="Load more"
              onLoadMorePics={this.loadMorePictures}
            />
          )
        )}
        {isModalOpen && (
          <Modal largeImage={largeImage} handleModal={this.handleModal} />
        )}
      </>
    );
  }
}
