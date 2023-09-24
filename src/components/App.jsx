import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Layout } from './Layout';
import { getSearch } from './api';
import { Searchbar } from './Searchbar/Searchbar';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImg, setTotalImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  const handleSubmit = value => {
    setValue(`${Date.now()}/${value}`);
    setPage(1);
    setImages([]);
    setError(null);
  };

  useEffect(() => {
    if (value === '') {
      return;
    }

    async function getImages() {
      try {
        setIsLoading(true);
        const valueArr = value.split('/');
        const requestValue = valueArr[1];
        const { totalHits, hits } = await getSearch(requestValue, page);
        if (hits.length === 0) {
          toast.error('Sorry, nothing found');
          return;
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalImg(totalHits);
      } catch (error) {
        setError(toast.error('Oops! Something went wrong...'));
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [value, page]);

  // async componentDidUpdate(prevProps, prevState) {
  //   const { value, page } = this.state;
  //   if (prevState.value !== value || prevState.page !== page) {
  //     this.setState({ isLoading: true });
  //     const valueArr = value.split('/');
  //     const requestValue = valueArr[1];
  //     try {
  //       const { totalHits, hits } = await getSearch(requestValue, page);
  //       if (hits.length === 0) {
  //         toast.error('Sorry, nothing found');
  //         return;
  //       }
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...hits],
  //         totalImg: totalHits,
  //       }));
  //     } catch (error) {
  //       this.setState({ error: toast.error('Oops! Something went wrong...') });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  const onMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = modalUrl => {
    setModalUrl(modalUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {images.length !== 0 && (
        <ImageGallery images={images} onClick={openModal} />
      )}
      {images.length > 0 && images.length < totalImg && (
        <Button onClick={onMore} />
      )}
      {showModal && <Modal url={modalUrl} onClose={closeModal} />}
      <GlobalStyle />
      <Toaster />
    </Layout>
  );
};
