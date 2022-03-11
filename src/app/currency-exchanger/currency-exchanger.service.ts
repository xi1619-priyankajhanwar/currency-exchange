import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exchange } from './exhange.model';
import { catchError, forkJoin, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangerService {
  private subject = new Subject<any>();
  ACCESS_KEY = '22bc734a65cdc47169a9d395920b02b7';
  // ACCESS_KEY = 'af8918917ab3c7186905d1572db6057a';
  currencyList:any={};

  constructor(private http: HttpClient) { }

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

  getMonthlyData(day:string,fromCurrency:string,toCurrency:string){
    toCurrency = toCurrency ? toCurrency : 'EUR';
    const url= 'http://data.fixer.io/api/'+day+'?access_key='+this.ACCESS_KEY+'&base='+fromCurrency+'&symbols='+toCurrency;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  getMonthlyDataInfo(days:Array<string>,from:string,to:string){
    const monthlyData$: Observable<any>[] = [];
    days.forEach(day => {
      const data$: Observable<any> = this.getMonthlyData(day,from,to);
      monthlyData$.push(data$);
    });
    return forkJoin(monthlyData$);
  }
} 