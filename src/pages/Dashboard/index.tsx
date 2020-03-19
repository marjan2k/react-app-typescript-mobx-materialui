import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import FlickrDrawer from '../../components/FlickrDrawer';
import FlickrAppbar from '../../components/FlickrAppbar';
import FlickrContent from '../../components/FlickrContent';


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
      <FlickrAppbar />
      <FlickrDrawer />
      <FlickrContent />
    </div>
  );
}

export default withRoot((Dashboard));
