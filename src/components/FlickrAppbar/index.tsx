import React from 'react';
import { inject, observer } from 'mobx-react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { drawerWidth } from '../../pages/Dashboard';
import { IStore } from '../../store/RootStore/interface/IStore';
import { RootStore } from '../../store/RootStore';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  }),
);

interface IFlickrAppbar {
  store?: IStore;
}

const FlickrAppbar = inject('store')(observer(({ store }: IFlickrAppbar) => {
  const classes = useStyles();
  const { selectedUserCollection: { userName } } = store as RootStore;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          {userName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}));

export default FlickrAppbar;
