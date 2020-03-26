import React from 'react';
import { inject, observer } from 'mobx-react';
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { mainCurrency } from '../../store/RootStore';
import { drawerWidth } from '../../pages/Dashboard';
import { IStore } from '../../store/RootStore/interface/IStore';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  }),
);

interface IPayTMAppbar {
  store?: IStore;
}

const PayTMAppbar = inject('store')(observer(({ store }: IPayTMAppbar) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container justify='space-between'>
          <Grid item>
            <Typography variant="h6" noWrap>
              Receipt Management
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Default currency: <b>{mainCurrency}</b>
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}));

export default PayTMAppbar;
