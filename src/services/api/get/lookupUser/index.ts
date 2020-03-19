import axios from 'axios';
import baseUrl from '../../baseUrl';


export default async (userUrl: string) => {
  const url = `${baseUrl}urls.lookupUser&url=${userUrl}`;
  return axios.get(url)
  .then((response) => {
    return ({
      userName: response.data.user.username._content, userId: response.data.user.id,
    });
  });
};
