import axios from 'axios';
import {IAPIHelperAdviceSlip} from "./interface/IAPIHelperAdviceSlipFact";

export default function getAdviceSlip() {
  return axios.get(
    'https://api.adviceslip.com/advice'
  ).then((response: IAPIHelperAdviceSlip) => response.data.slip)
}
