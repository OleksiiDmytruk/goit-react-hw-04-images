import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <List>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          url={webformatURL}
          modalUrl={largeImageURL}
          onClick={onClick}
        />
      ))}
    </List>
  );
};
