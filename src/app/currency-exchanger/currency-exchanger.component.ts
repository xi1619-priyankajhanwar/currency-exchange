import { Component, OnInit } from '@angular/core';
import { CurrencyExchangerService } from './currency-exchanger.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Exchange } from './exhange.model';

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.scss']
})
export class CurrencyExchangerComponent implements OnInit {
  currencyList:Array<string>=[];
  currencyExchangeForm = new FormGroup({
    amount: new FormControl('null',[Validators.required]),
    fromCurrency: new FormControl('EUR'),
    toCurrency:new FormControl('USD')
  });
  conversionAmount:any=null;
  valueOfUnit:any='XXX';

  constructor(private currencyExchangerService:CurrencyExchangerService) { }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  getCurrencyList() {
    this.currencyExchangerService.getCurrencies()
      .subscribe((data) => this.currencyList = Object.keys(data));
  }

  getConversion(value:Exchange){
    this.currencyExchangerService.getConversion(value)
    .subscribe((data:any) => {
      const toCurrency = value.toCurrency;
      const fromCurrency = value.fromCurrency;
      this.valueOfUnit = (data.rates[toCurrency]/data.rates[fromCurrency]).toFixed(3);
      this.conversionAmount = (this.valueOfUnit*(value.amount)).toFixed(3);
    });
  }

  onSwapCurrency(){
    this.currencyExchangeForm.patchValue({
      fromCurrency: this.currencyExchangeForm.get('toCurrency')?.value, 
      toCurrency: this.currencyExchangeForm.get('fromCurrency')?.value
    });
  }

  onConvert() {
    const value = this.currencyExchangeForm.value;
    this.getConversion(value);
  }

  onMoreDetails(){
  }
}
