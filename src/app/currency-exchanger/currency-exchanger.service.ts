import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exchange } from './exhange.model';
import { catchError, concatMap, forkJoin, Observable, of, Subject, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangerService {
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  ACCESS_KEY = '09ac9b62827e512d92d1108a1c75126e';
  currencyList:any={};
  getCurrencies(){
    const currencyUrl = 'https://openexchangerates.org/api/currencies.json';
    return this.http.get(currencyUrl).pipe(catchError(this.handleError));
  }

  getConversion(value:Exchange){
    const currencyUrl='http://data.fixer.io/api/latest?access_key='+this.ACCESS_KEY+'&symbols='+value.fromCurrency+','+value.toCurrency+',QAR,GBP,PLN,MXN,INR,AED,JPY&format=1'
    return this.http.get(currencyUrl).pipe(catchError(this.handleError));
  }

  handleError() {
    let errorMessage = 'Error occured';
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getCurrencyName(currencyCode:string){
    return this.currencyList[currencyCode];
  }

  setCurrencyList(list:Object){
    this.currencyList = list;
  }
  getCurrencyList(){
    return this.currencyList;
  }

  sendUpdatedCurrency(message: string) {
    this.subject.next({ text: message });
  }

  getUpdatedCurrency(): Observable<any> {
      return this.subject.asObservable();
  }

  getMonthlyData(day:string){
    const to = 'EUR';
    const date = 'YYYY-MM-DD';
    const url ='';
    // const url= 'http://data.fixer.io/api/'+day+'?access_key='+this.ACCESS_KEY+'&base='+to+'&symbols=USD';
    return this.http.get(url).pipe(catchError(this.handleError));
  
  }

  getMonthlyDataInfo(days:Array<string>){
    const to = 'EUR';
    const date = 'YYYY-MM-DD';
    const addressArray$: Observable<any>[] = [];
    days.forEach(day => {
      const address$: Observable<any> = this.getMonthlyData(day);
      addressArray$.push(address$);
    });
    return forkJoin(addressArray$);
  }
} 