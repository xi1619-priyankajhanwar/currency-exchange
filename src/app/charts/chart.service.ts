import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  ACCESS_KEY = Constants.AUTH_KEY;
  baseURL = Constants.baseURL;
  constructor(private http: HttpClient) { }

  // method for service call to get historic data for particular date
  getMonthlyData(day:string,fromCurrency:string,toCurrency:string){
    toCurrency = toCurrency ? toCurrency : 'EUR';
    const url= this.baseURL+day+'?access_key='+this.ACCESS_KEY+'&base=EUR&symbols='+toCurrency+','+fromCurrency;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // method to get historic data for array of dates i.e all months of previous year
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
