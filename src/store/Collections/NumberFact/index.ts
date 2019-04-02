import RootCollection from "../RootCollection"
import getNumberFact from '../../../services/api/getNumberFact';

export default class NumberFact extends RootCollection {
  constructor() {
    super();
    this.name = 'NumberFact';
    const values = localStorage.getItem('NumberFact');
    if(values) {
      this.setInitialValues(JSON.parse(values));
    }
  }

  async downloadUpdate() {
    this.clearTimer();
    this.setError(null);
    try {
      const results = await getNumberFact();
      this.setValues(results.number.toString(), results.text);
    }
    catch (error) {
      this.setError(error);
    }
    finally {
      this.startTimer();
      this.saveValuesInLocalStorage();
    }
  }
}
