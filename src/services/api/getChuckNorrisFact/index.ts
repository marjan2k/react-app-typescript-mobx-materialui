import axios from 'axios';
import {IAPIHelperChuckNorris} from "./interface/IAPIHelperChuckNorrisFact";

export default function getChuckNorrisFact() {
  return axios.get(
    'https://api.chucknorris.io/jokes/random'
  ).then((response: IAPIHelperChuckNorris) => response.data)
}
