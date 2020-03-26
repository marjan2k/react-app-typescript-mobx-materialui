import React from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../../store/RootStore/interface/IStore';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { mainCurrency, RootStore } from '../../store/RootStore';
import PayTMReceiptContainer from './PayTMReceiptContainer';
import { Button } from '@material-ui/core';


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

interface IPayTMContent {
  store?: IStore;
}

const PayTMContent = inject('store')(observer(({ store }: IPayTMContent) => {
  const classes = useStyles();
  const { receiptCollections, addReceipt, availableRates, totalAmount, submitReceipts } = store as RootStore;

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Button onClick={addReceipt} disabled={receiptCollections.length >= 5}>Add New Receipt</Button>
      {receiptCollections.map(receipt => (
        <PayTMReceiptContainer key={JSON.stringify(receipt)} availableRates={availableRates} receipt={receipt} />
      ))}
      <br />
      Total Amount: {totalAmount ? totalAmount : 0} {mainCurrency}
      <br />
      {receiptCollections.length > 0 && (
        <Button color='primary' disabled={totalAmount > 1000} onClick={submitReceipts}>Submit Receipts</Button>
      )}
    </div>
  );
}));

export default PayTMContent;
