import axios from 'axios';
import baseUrl from '../../baseUrl';


export default async (currency: string) => {
  const url = `${baseUrl}${currency}`;
  return axios.get(url).then(res => res.data);
};
