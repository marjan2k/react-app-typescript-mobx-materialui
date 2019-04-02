import {action, observable} from "mobx";

export default class RootCollection {
  @observable id = '';
  @observable name = '';
  @observable primaryValue = '';
  @observable secondaryValue = '';
  @observable loading = false;
  @observable live = true;
  @observable error:(null|Object|String) = null;
  @observable currentTime = 0;
  timer: any;

  getValues() {
    return {
      id: this.id,
      primaryValue: this.primaryValue,
      secondaryValue: this.secondaryValue,
      live: this.live
    }
  }

  setInitialValues(parsedJson) {
    this.setValuesFromParsedJson(parsedJson);
    if(parsedJson.live) {
      this.startTimer();
    }
  }

  @action
  setValues(id: string, primaryValue: string, secondaryValue = '', live = this.live) {
    this.id = id;
    this.primaryValue = primaryValue;
    this.secondaryValue = secondaryValue;
    this.live = live;
  }

  setValuesFromParsedJson(parsedJson) {
    this.setValues(parsedJson.id, parsedJson.primaryValue, parsedJson.secondaryValue, parsedJson.live);
  }

  saveValuesInLocalStorage() {
    localStorage.setItem(this.name, JSON.stringify(this.getValues()));
  }

  @action
  setLoading(loadingStatus:boolean) {
    this.loading = loadingStatus;
  }

  @action
  setError(error:(null|Object|String)) {
    this.error = error;
  }

  @action
  toggleLive = () => {
    if(this.live) {
      this.clearTimer();
    }
    else {
      this.startTimer();
    }
    this.live = !this.live;
    this.saveValuesInLocalStorage();
  };

  @action
  startTimer() {
    this.currentTime = 1;
    this.timer = setInterval(this.updateCurrentTime, 1000);
  }

  @action
  clearTimer() {
    this.currentTime = 0;
    clearTimeout(this.timer);
  }

  @action.bound
  updateCurrentTime() {
    if(this.currentTime === 10) {
      this.clearTimer();
      this.downloadUpdate();
    }
    else {
      this.currentTime = this.currentTime + 1;
    }
  }
  async downloadUpdate() {

  }
}
