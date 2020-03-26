import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import PayTMDrawer from '../../components/PayTMDrawer';
import PayTMAppbar from '../../components/PayTMAppbar';
import PayTMContent from '../../components/PayTMContent';


export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  }),
);

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PayTMAppbar />
      <PayTMDrawer />
      <PayTMContent />
    </div>
  );
}

export default withRoot((Dashboard));
