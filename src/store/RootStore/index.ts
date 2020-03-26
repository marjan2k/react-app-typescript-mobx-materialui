import { action, computed, observable } from 'mobx';
import ReceiptCollection from '../Collections/ReceiptCollection';
import currentExchangeRate from '../../services/api/get/currentExchangeRate';


export const mainCurrency = 'CAD';

export class RootStore {
  @observable receiptCollections: ReceiptCollection[] = [];
  @observable exchangeRates;

  constructor() {
    this.downloadExchangeRates(mainCurrency);
  }

  @computed get availableRates() {
    return this.exchangeRates && this.exchangeRates.rates && Object.keys(this.exchangeRates.rates);
  }

  @computed get totalAmount() {
    return this.receiptCollections.reduce((acc, curr) => {
      return acc + parseFloat(curr.amount) / this.exchangeRates.rates[curr.currency];
    }, 0);
  }

  @action.bound
  async downloadExchangeRates(currency) {
    this.exchangeRates = await currentExchangeRate(currency);
  }

  @action.bound
  setReceipts = (receipts: ReceiptCollection[]) => {
    this.receiptCollections = receipts;
  };

  @action.bound
  addReceipt() {
    this.setReceipts([...this.receiptCollections, new ReceiptCollection()]);
  };

  @action.bound
  submitReceipts() {
    console.log('Receipts');
    this.receiptCollections.forEach(receipt => console.log(`${receipt.description}: ${receipt.amount} ${receipt.currency}`));
    console.log(`Total Amount: ${this.totalAmount} ${mainCurrency}`);
  }
}
