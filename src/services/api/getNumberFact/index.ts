import axios from 'axios';
import {IAPIHelperNumberFact} from "./interface/IAPIHelperNumberFact";

export default function getChuckNorrisFact() {
  return axios.get(
    'http://numbersapi.com/random/trivia?json'
  ).then((response: IAPIHelperNumberFact) => response.data)
}
