import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exchange } from './exhange.model';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangerService {
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  ACCESS_KEY = '09ac9b62827e512d92d1108a1c75126e';

  getCurrencies(){
    const currencyUrl = 'https://openexchangerates.org/api/currencies.json';
    return this.http.get(currencyUrl);
  }

  getConversion(value:Exchange){
    const currencyUrl='http://data.fixer.io/api/latest?access_key='+this.ACCESS_KEY+'&symbols='+value.fromCurrency+','+value.toCurrency+',USD,GBP,PLN,MXN&format=1'
    return this.http.get(currencyUrl);
  }

  sendUpdatedCurrency(message: string) {
    this.subject.next({ text: message });
  }

  getUpdatedCurrency(): Observable<any> {
      return this.subject.asObservable();
  }

} 