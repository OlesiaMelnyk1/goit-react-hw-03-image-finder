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
    largeImageData: {},
    isLoading: false,
    isModalOpen: false,
    error: false,
  };

  async componentDidUpdate(_, prevState) {
    const { text, page } = this.state;
    if (prevState.text !== text || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const { hits } = await fetchImages(text, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
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
    });
  };

  loadMorePictures = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleModal = event => {
    const { code } = event;
    const {
      nodeName,
      dataset: { source },
      alt,
    } = event.target;
    const { isModalOpen } = this.state;
    if (nodeName === 'IMG') {
      if (isModalOpen === true) {
        return;
      }
      this.setState({
        isModalOpen: true,
        largeImageData: {
          source,
          alt,
        },
      });
    }
    if (nodeName === 'DIV' || code === 'Escape') {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  render() {
    const { images, largeImageData, isLoading, isModalOpen, error } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchImages} />
        {error === true
          ? alert('Sorry, there are no images for your request')
          : images.length > 0 && (
              <ImageGallery pictures={images} handleModal={this.handleModal} />
            )}
        {isLoading === true ? (
          <Loader />
        ) : (
          images.length > 11 && (
            <Button
              type="button"
              text="Load more"
              loadMorePictures={this.loadMorePictures}
            />
          )
        )}
        {isModalOpen && (
          <Modal data={largeImageData} handleModal={this.handleModal} />
        )}
      </>
    );
  }
}
