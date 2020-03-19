import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { GridList, GridListTile, Hidden } from '@material-ui/core';
import { observer } from 'mobx-react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
    },
  }),
);

const GridListResponsive = observer(({children}) => {
  const classes = useStyles();
  return (
    <>
      <Hidden mdUp>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {children}
        </GridList>
      </Hidden>
      <Hidden smDown>
        <GridList cellHeight={250} className={classes.gridList} cols={4}>
          {children}
        </GridList>
      </Hidden>
    </>
  );
});

const FlickrContentInfititeLoaderResults = observer(({ results }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridListResponsive>
        {results.map((result, index) => (
          <GridListTile key={result.imgSrc} cols={1}>
            <img src={result.imgSrc} alt={`pic number ${index + 1}`} />
          </GridListTile>
        ))}
      </GridListResponsive>
    </div>
  );
});

export default FlickrContentInfititeLoaderResults;
