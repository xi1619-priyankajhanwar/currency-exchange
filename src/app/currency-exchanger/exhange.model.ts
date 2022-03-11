export interface Exchange {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}
export interface CurrencyData{
  base: string;
  date: Date;
  historical: boolean;
  rates: any;
  success: boolean;
  timestamp: string;
}

