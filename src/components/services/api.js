import axios from 'axios';

export async function fetchImages(text, page) {
  const searchParams = new URLSearchParams({
    key: '33175901-e09247312919de26dfad47d53',
    q: text,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  return images.data;
}
