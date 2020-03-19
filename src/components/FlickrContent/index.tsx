import React from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../../store/RootStore/interface/IStore';
import { RootStore } from '../../store/RootStore';
import FlickrInfiniteLoader from './FlickrContentInfiniteLoader';
import FlickrContentInfititeLoaderResults from './FlickrContentInfiniteLoader/FlickrContentInfititeLoaderResults';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);

interface IFlickrContent {
  store?: IStore;
}

const FlickrContent = inject('store')(observer(({ store }: IFlickrContent) => {
  const classes = useStyles();
  const { selectedUserCollection: { downloadUserPhotos, results, userName, downloadNextResults, pagination } } = store as RootStore;

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <FlickrInfiniteLoader
        userName={userName}
        getMoreResults={downloadNextResults}
        pagination={pagination}
        downloadResults={downloadUserPhotos}
        resultsCount={results.length}
        ResultsComponent={
          <FlickrContentInfititeLoaderResults
            results={results} />
        }
      />
    </div>
  );
}));

export default FlickrContent;
