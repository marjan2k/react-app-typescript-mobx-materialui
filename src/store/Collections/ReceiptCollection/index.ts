import { action, observable } from 'mobx';
import { mainCurrency } from '../../RootStore';


export default class ReceiptCollection {
  @observable description;
  @observable amount;
  @observable currency = mainCurrency;

  @action.bound
  setDescription(description) {
    this.description = description;
  };

  @action.bound
  setAmount(amount) {
    this.amount = amount;
  };

  @action.bound
  setCurrency(currency) {
    this.currency = currency;
  };

  @action.bound
  clearAll() {
    this.setDescription(null);
    this.setAmount(null);
    this.setCurrency(mainCurrency);
  };
}
