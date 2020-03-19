import axios from 'axios';
import baseUrl from '../../baseUrl';


const CancelToken = axios.CancelToken;
let source = CancelToken.source();

export default async (userId: string, page: number) => {
  source && source.cancel('Operation canceled due to new request.');
  source = axios.CancelToken.source();

  const url = `${baseUrl}people.getPublicPhotos&extras=url_m&user_id=${userId}&page=${page}`;
  return axios.get(url, { cancelToken: source.token })
  .then((response) => {
    return ({
      pagination: {
        page: response.data.photos.page,
        totalPages: response.data.photos.pages,
      },
      results: response.data.photos.photo.map(currentPhoto => ({
        imgSrc: currentPhoto.url_m,
      })),
    });
  });
};
