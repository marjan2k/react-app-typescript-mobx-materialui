import React, { useEffect } from 'react';
import Observer from '@researchgate/react-intersection-observer';
import { Grid, LinearProgress } from '@material-ui/core';
import { observer } from 'mobx-react';


const initiateDownloadResults = (downloadResults: () => Promise<void>, resultsCount: number) => () => {
  if (!resultsCount) {
    downloadResults();
  }
};

const getMoreResultsHandler = (getMoreResults: () => void) => (entry: IntersectionObserverEntry, unobserve: () => void) => {
  if (entry.isIntersecting) {
    getMoreResults();
  }
};

const FlickrInfiniteLoader = observer(({ downloadResults, ResultsComponent, pagination, userName, resultsCount, getMoreResults }) => {
  useEffect(initiateDownloadResults(downloadResults, resultsCount), [userName]);

  return (
    <Grid container direction='column'>
      <>
        <Grid item>
          {ResultsComponent}
        </Grid>
        {(pagination.page < pagination.totalPages) && (
          <Observer onChange={getMoreResultsHandler(getMoreResults)}>
            <Grid item>
              <LinearProgress />
            </Grid>
          </Observer>
        )}
      </>
    </Grid>
  );
});

export default FlickrInfiniteLoader;
