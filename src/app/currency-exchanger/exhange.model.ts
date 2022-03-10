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
