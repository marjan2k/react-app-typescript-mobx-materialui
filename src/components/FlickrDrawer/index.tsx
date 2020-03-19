import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { drawerWidth } from '../../pages/Dashboard';
import { inject, observer } from 'mobx-react';
import { IStore } from '../../store/RootStore/interface/IStore';
import { RootStore } from '../../store/RootStore';
import FlickrDrawerUserItem from './FlickrDrawerUserItem';


const logoUrl = 'https://cdn.kustomerhostedcontent.com/media/5aecd7338a0607779d1ec9cc/b1446148194f331b2171c82cc2eb1a81.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      height: 40,
    },
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    logoGrid: {
      height: '100%',
    },
  }),
);

interface IFlickrDrawer {
  store?: IStore;
}

const FlickrDrawer = inject('store')(observer(({ store }: IFlickrDrawer) => {
  const classes = useStyles();
  const { userCollections, selectedUserCollection, setSelectedUserCollection } = store as RootStore;

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
    >
      <div className={classes.toolbar}>
        <Grid container direction='column' alignItems='center' justify='center' className={classes.logoGrid}>
          <div>
            <img
              src={logoUrl}
              alt='Flickr'
              className={classes.logo}
            />
          </div>
        </Grid>
      </div>
      <Divider />
      <List>
        {userCollections.map((userCollection) => (
          <FlickrDrawerUserItem
            selected={userCollection === selectedUserCollection}
            setSelected={setSelectedUserCollection}
            userCollection={userCollection}
            key={userCollection.userPhotoUrl}
          />
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}));

export default FlickrDrawer;
