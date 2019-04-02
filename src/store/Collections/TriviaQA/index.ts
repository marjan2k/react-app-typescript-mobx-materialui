import RootCollection from "../RootCollection"
import getTriviaQA from '../../../services/api/getTriviaQA';

export default class TriviaQA extends RootCollection {
  constructor() {
    super();
    this.name = 'TriviaQA';
    const values = localStorage.getItem('TriviaQA');
    if (values) {
      this.setInitialValues(JSON.parse(values));
    }
  }

  async downloadUpdate() {
    this.clearTimer();
    this.setError(null);
    try {
      const results = await getTriviaQA();
      this.setValues(results.id, results.question, results.answer);
    }
    catch (error) {
      this.setError(error);
    }
    finally {
      this.live && this.startTimer();
      this.saveValuesInLocalStorage();
    }
  }
}
