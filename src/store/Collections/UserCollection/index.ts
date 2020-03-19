import { action, observable } from 'mobx';
import lookupUser from '../../../services/api/get/lookupUser';
import publicPhotos from '../../../services/api/get/publicPhotos';


export default class UserCollection {
  @observable userPhotoUrl = '';
  @observable userId = '';
  @observable userName = '';
  @observable results = [];
  @observable pagination = { page: 0, totalPages: 0 };

  constructor(userPhotoUrl) {
    this.userPhotoUrl = userPhotoUrl;
  }

  @action.bound
  setPagination(pagination) {
    this.pagination = pagination;
  }

  @action.bound
  setResults(results) {
    this.results = results;
  }

  @action.bound
  async downloadUserNSID() {
    const { userName, userId } = await lookupUser(this.userPhotoUrl);
    this.userName = userName;
    this.userId = userId;
  }

  @action.bound
  async downloadUserPhotos(page = 1) {
    if (!this.userId) {
      await this.downloadUserNSID();
    }
    const { results, pagination } = await publicPhotos(this.userId, page);
    this.setResults(this.results.concat(results));
    this.setPagination(pagination);
  }

  @action.bound
  downloadNextResults() {
    this.downloadUserPhotos(this.pagination.page + 1);
  }
}
