import { Grid, ListItem, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { drawerWidth } from '../../pages/Dashboard';
import { inject, observer } from 'mobx-react';
import { IStore } from '../../store/RootStore/interface/IStore';


const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Paytm_logo.jpg';

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

interface IPayTMDrawer {
  store?: IStore;
}

const PayTMDrawer = inject('store')(observer(({ store }: IPayTMDrawer) => {
  const classes = useStyles();
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
              alt='PayTM'
              className={classes.logo}
            />
          </div>
        </Grid>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary='Receipts' />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}));

export default PayTMDrawer;
