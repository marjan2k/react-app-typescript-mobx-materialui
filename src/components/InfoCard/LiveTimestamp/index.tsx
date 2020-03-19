import React from 'react';
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import createStyles from "@material-ui/core/styles/createStyles";
import {inject, observer} from "mobx-react";
import {RootStore} from "../../../store/RootStore";
import {IStore} from "../../../store/RootStore/interface/IStore";
import TriviaQA from "../../../store/Collections/TriviaQA";


interface ILiveTimestamp {
  collectionStore: TriviaQA;
}

const styles = (theme: Theme) =>
  createStyles({
    name: {
      paddingLeft: theme.spacing(2),
    },
  });

const LiveTimestamp = inject('store')(observer((props: (WithStyles<typeof styles>
  & (ILiveTimestamp))) => {
  const {collectionStore, classes} = props;
  // const { TriviaQA } = store as RootStore;
  return (
    <Grid container alignItems='center' justify='space-between'>
      <Grid item className={classes.name}>
        <Typography variant='body2'>{collectionStore.name}</Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems='center'>
          <Typography variant='body2'>Live</Typography>
          <Switch checked={collectionStore.live} onChange={collectionStore.toggleLive} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <LinearProgress variant="buffer" value={collectionStore.currentTime * 10} valueBuffer={100} />
      </Grid>
    </Grid>
  );
}));

export default (withStyles(styles)(LiveTimestamp));
