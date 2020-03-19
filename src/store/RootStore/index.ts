import { action, observable } from 'mobx';
import UserCollection from '../Collections/UserCollection';


const userPhotoURLS = [
  'https://www.flickr.com/photos/vincgalery/',
  'https://www.flickr.com/photos/128476074@N08/',
  'https://www.flickr.com/photos/angeltaipefotografia/',
  'https://www.flickr.com/photos/jptimmons/',
  'https://www.flickr.com/photos/monegka/',
];

const collectionIndexStorageKey = 'setCollectionIndex';

export class RootStore {
  @observable userCollections: UserCollection[] = [];
  @observable selectedUserCollection: UserCollection;

  constructor() {
    this.userCollections = userPhotoURLS.map(url => new UserCollection(url));

    const collectionIndexInLocalStorage = localStorage.getItem(collectionIndexStorageKey);

    if (collectionIndexInLocalStorage && this.userCollections[collectionIndexInLocalStorage]) {
      this.selectedUserCollection = this.userCollections[collectionIndexInLocalStorage];
    } else {
      this.selectedUserCollection = this.userCollections[0];
    }
  }

  @action.bound
  setSelectedUserCollection = (userCollection: UserCollection) => () => {
    this.selectedUserCollection = userCollection;
    const collectionIndex = this.userCollections.findIndex(collection => collection === userCollection);
    if (collectionIndex) {
      localStorage.setItem(collectionIndexStorageKey, JSON.stringify(collectionIndex));
    }
  };
}
