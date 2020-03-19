import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import UserCollection from '../../../store/Collections/UserCollection';
import { observer } from 'mobx-react';


const downloadUserName = (userCollection: UserCollection, setLoadingUserName: Dispatch<SetStateAction<boolean>>) => () => {
  if (!userCollection.userName) {
    setLoadingUserName(true);
    userCollection.downloadUserNSID().finally(() => setLoadingUserName(false));
  }
};

interface IFlickrDrawerUserItem {
  userCollection: UserCollection;
  setSelected: (userCollection: UserCollection) => () => void;
  selected: boolean;
}

const FlickrDrawerUserItem = observer(({ userCollection, selected, setSelected }: IFlickrDrawerUserItem) => {
  const [loadingUserName, setLoadingUserName] = useState(false);

  useEffect(downloadUserName(userCollection, setLoadingUserName), []);

  return (
    <ListItem button selected={selected} onClick={setSelected(userCollection)}>
      <ListItemText primary={loadingUserName ? <Skeleton /> : userCollection.userName} />
    </ListItem>
  );
});

export default FlickrDrawerUserItem;
