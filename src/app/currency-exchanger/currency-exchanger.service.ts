import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Exchange } from '../exhange.model';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangerService {
  private subject = new Subject<any>();
  ACCESS_KEY = Constants.AUTH_KEY;
  _baseURL:string;
  currencyList:any={};

  constructor(private http: HttpClient) { 
    this._baseURL = Constants.baseURL;
  }

  getCurrencies(){
    const currencyUrl = Constants.currencyJsonURL;
    return this.http.get(currencyUrl).pipe(catchError(this.handleError));
  }

  getConversion(value:Exchange){
    const currencyUrl= this._baseURL+'latest?access_key='+this.ACCESS_KEY+'&symbols='+value.fromCurrency+','+value.toCurrency+',QAR,GBP,PLN,INR,AED,AUD,JPY&format=1'
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

  sendUpdatedCurrency(data: any) {
    this.subject.next({ data: data });
  }

  getUpdatedCurrency(): Observable<any> {
    return this.subject.asObservable();
  }
} 