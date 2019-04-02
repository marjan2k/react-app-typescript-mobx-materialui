export interface IAdviceSlipResponse {
  slip: IAdviceSlip;
}

interface IAdviceSlip {
  slip_id: number;
  advice: string;
}
