import RootCollection from "../RootCollection"
import getChuckNorrisFact from '../../../services/api/getChuckNorrisFact';

export default class ChuckNorrisFact extends RootCollection {
  constructor() {
    super();
    this.name = 'ChuckNorrisFact';
    const values = localStorage.getItem('ChuckNorrisFact');
    if (values) {
     this.setInitialValues(JSON.parse(values));
    }
  }

  async downloadUpdate() {
    this.clearTimer();
    this.setError(null);
    try {
      const results = await getChuckNorrisFact();
      this.setValues(results.id, results.value);
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
