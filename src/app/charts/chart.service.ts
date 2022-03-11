import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  ACCESS_KEY = 'af8918917ab3c7186905d1572db6057a';
  constructor(private http: HttpClient) { }

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

  handleError() {
    let errorMessage = 'Error occured';
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
