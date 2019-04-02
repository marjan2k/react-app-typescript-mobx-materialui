import React from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

import LiveTimestamp from "./LiveTimestamp";
import {observer} from "mobx-react";
import TriviaQA from "../../store/Collections/TriviaQA";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";

interface IInfoCard {
  collectionStore: TriviaQA;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center'
    },
  });

const InfoCard = observer((props: (WithStyles<typeof styles> & IInfoCard)) => {
  const {collectionStore, classes} = props;
  if (!collectionStore.primaryValue) collectionStore.downloadUpdate();
  return (
    <Grid item lg={6} md={10} sm={12} className={classes.root}>
      <Card>
        <LiveTimestamp collectionStore={collectionStore} />
        <CardActionArea onClick={() => collectionStore.downloadUpdate()}>
          <CardContent>
            <Typography gutterBottom variant="h6">
              {collectionStore.primaryValue}
            </Typography>
            {collectionStore.secondaryValue &&
            <>
              <ArrowDownward color='primary' />
              <Typography gutterBottom variant="button">
                {collectionStore.secondaryValue}
              </Typography>
            </>
            }
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
});

export default withStyles(styles)(InfoCard);
