import {action, observable} from "mobx";
import TriviaQA from "../Collections/TriviaQA";
import NumberFact from "../Collections/NumberFact";
import ChuckNorrisFact from "../Collections/ChuckNorrisFact";
import AdviceSlip from "../Collections/AdviceSlip";

export class RootStore {
  @observable TriviaQA = new TriviaQA();
  @observable NumberFact = new NumberFact();
  @observable ChuckNorrisFact = new ChuckNorrisFact();
  @observable AdviceSlip = new AdviceSlip();
  @observable collectionOrderNames = ['TriviaQA', 'NumberFact', 'AdviceSlip', 'ChuckNorrisFact',];
  @observable collections = [this.TriviaQA, this.NumberFact, this.AdviceSlip, this.ChuckNorrisFact];
  @observable collectionOrder = this.collections;
  constructor() {
    const orderNamesInLocalStorage = localStorage.getItem('collectionOrderNames');
    // const collections = this.collections;
    if(orderNamesInLocalStorage) {
      const collectionOrderNames = JSON.parse(orderNamesInLocalStorage);
      this.collectionOrder = collectionOrderNames.map((collectionName: string) =>
        this.collections.find(collection => collection.name === collectionName));
    }
  }

  @action.bound
  setCollectionOrder(collectionOrder) {
    this.collectionOrder = collectionOrder;
    this.collectionOrderNames = collectionOrder.map(collection => collection.name);
    localStorage.setItem('collectionOrderNames', JSON.stringify(this.collectionOrderNames));
  }

  @action.bound
  reorder = (collectionOrder, startIndex, endIndex) => {
    const [removed] = collectionOrder.splice(startIndex, 1);
    collectionOrder.splice(endIndex, 0, removed);
    this.setCollectionOrder(collectionOrder);
  };
}
