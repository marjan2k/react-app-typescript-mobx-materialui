import RootCollection from "../RootCollection"
import getAdviceSlip from '../../../services/api/getAdviceSlip';

export default class AdviceSlip extends RootCollection {
  constructor() {
    super();
    this.name = 'AdviceSlip';
    const values = localStorage.getItem('AdviceSlip');
    if (values) {
      this.setInitialValues(JSON.parse(values));
    }
  }

  async downloadUpdate() {
    this.clearTimer();
    this.setError(null);
    try {
      const results = await getAdviceSlip();
      this.setValues(results.slip_id.toString(), results.advice);
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
