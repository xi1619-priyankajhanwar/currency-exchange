export interface Exchange {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}
export interface CurrencyData{
  base: string;
  date: Date;
  historical: boolean;
  rates: Rates;
  success: boolean;
  timestamp: string;
}
export interface Rates {
  USD: string;
}
