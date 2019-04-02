import axios from 'axios';
import { IApiHelperTriviaQA } from "./interface/IApiHelperTriviaQA";

export default function getTriviaQA () {
  return axios.get(
    'http://jservice.io/api/random')
    .then((response: IApiHelperTriviaQA) => response.data[0]);
}
