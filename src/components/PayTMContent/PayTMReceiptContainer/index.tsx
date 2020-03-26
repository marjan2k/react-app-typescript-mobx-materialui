import React from 'react';
import { Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';


const labelId = new Date().toDateString();

const PayTMReceiptContainer = observer(({ receipt, availableRates }) => {
  const handleChangeDescription = (event) => {
    receipt.setDescription(event.target.value);
  };
  const handleChangeAmount = (event) => {
    receipt.setAmount(event.target.value);
  };
  const handleChangeCurrency = (event) => {
    receipt.setCurrency(event.target.value);
  };

  return (
    <Grid container spacing={2} alignItems='flex-end'>
      <Grid item>
        <TextField
          label="Description"
          value={receipt.description}
          onChange={handleChangeDescription}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Amount"
          value={receipt.amount}
          onChange={handleChangeAmount}
        />
      </Grid>
      <Grid item>
        <InputLabel id={labelId}>Currency</InputLabel>
        <Select
          labelId={labelId}
          id="demo-simple-select"
          value={receipt.currency}
          onChange={handleChangeCurrency}
        >
          {availableRates && availableRates.map((rate) => (
            <MenuItem value={rate} key={`${rate}-${labelId}`}>{rate}</MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
});

export default PayTMReceiptContainer;
