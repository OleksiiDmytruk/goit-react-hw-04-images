import axios from 'axios';

axios.defaults.params = {
  key: '38485211-2ce599a273e65f72373582d0e',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getSearch = async (value, page) => {
  const respons = await axios.get(`?q=${value}&page=${page}`);
  return respons.data;
};
