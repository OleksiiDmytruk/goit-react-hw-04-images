import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Layout } from './Layout';
import { getSearch } from './api';
import { Searchbar } from './Searchbar/Searchbar';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    totalImg: null,
    isLoading: false,
    error: null,
    showModal: false,
    modalUrl: '',
  };

  handleSubmit = value => {
    this.setState({
      value: `${Date.now()}/${value}`,
      page: 1,
      images: [],
      error: null,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      this.setState({ isLoading: true });
      const valueArr = value.split('/');
      const requestValue = valueArr[1];
      try {
        const { totalHits, hits } = await getSearch(requestValue, page);
        if (hits.length === 0) {
          toast.error('Sorry, nothing found');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalImg: totalHits,
        }));
      } catch (error) {
        this.setState({ error: toast.error('Oops! Something went wrong...') });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showModal = modalUrl => {
    this.setState({
      modalUrl,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { isLoading, totalImg, images, modalUrl, showModal } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {images.length !== 0 && (
          <ImageGallery images={images} onClick={this.showModal} />
        )}
        {images.length > 0 && images.length < totalImg && (
          <Button onClick={this.onMore} />
        )}
        {showModal && <Modal url={modalUrl} onClose={this.closeModal} />}
        <GlobalStyle />
        <Toaster />
      </Layout>
    );
  }
}
