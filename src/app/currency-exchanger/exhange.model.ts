export class Exchange {
  public amount: number;
  public fromCurrency: string;
  public toCurrency: string;

  constructor(amount: number, fromCurrency: string, toCurrency: string) {
    this.amount = amount;
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
  }
}
export class CurrencyData{
  public base: string;
  public date: Date;
  public historical: boolean;
  public rates: Rates;
  public success: boolean;
  public timestamp: string;

  constructor(base: string, date: Date, historical:boolean,success:boolean, rates:Rates,timestamp: string) {
    this.base = base;
    this.date = date;
    this.historical=historical;
    this.rates= rates;
    this.success=success;
    this.timestamp=timestamp;
  }
}
export interface Rates {
  USD: string;
  // constructor(USD: string) {
  //   this.USD = USD;
  // }
}
