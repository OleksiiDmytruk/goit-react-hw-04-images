import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, modalUrl, onClick }) => {
  return (
    <Item>
      <Img src={url} onClick={() => onClick(modalUrl)} />
    </Item>
  );
};
