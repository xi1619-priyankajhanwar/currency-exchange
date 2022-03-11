import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrencyExchangerService } from './currency-exchanger.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Exchange } from './exhange.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.scss']
})
export class CurrencyExchangerComponent implements OnInit, OnChanges {
  @Input() from = ''; 
  @Input() to = ''; 
  @Input() amount = ''; 
  @Input() onDetailsPage = false;
  currencyList:Array<string>=[];
  currencyExchangeForm = new FormGroup({
    amount: new FormControl('null',[Validators.required]),
    fromCurrency: new FormControl('EUR'),
    toCurrency:new FormControl('USD')
  });
  conversionAmount:any=null;
  valueOfUnit:any='XXX';

  constructor(private currencyExchangerService:CurrencyExchangerService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.currencyExchangeForm.patchValue({
      fromCurrency: this.from, 
      toCurrency: this.to,
      amount:this.amount
    });
    this.getCurrencyList();
    if(this.onDetailsPage){
      this.onConvert();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currencyExchangeForm.patchValue({
      fromCurrency: this.from, 
      toCurrency: this.to,
      amount:this.amount
    });
  }

  getCurrencyList() {
    this.currencyList = Object.keys(this.currencyExchangerService.getCurrencyList());
    if(Object.keys(this.currencyList).length === 0){
      this.currencyExchangerService.getCurrencies()
      .subscribe((data) => {
        this.currencyExchangerService.setCurrencyList(data);
        this.currencyList = Object.keys(data);
      });
    }
  }

  getConversion(value:Exchange){
    this.currencyExchangerService.getConversion(value)
      .subscribe((data:any) => {
        const toCurrency = value.toCurrency;
        const fromCurrency = value.fromCurrency;
        this.valueOfUnit = (data.rates[toCurrency]/data.rates[fromCurrency]).toFixed(3);
        this.conversionAmount = (this.valueOfUnit*(value.amount)).toFixed(3);
        this.currencyExchangerService.sendUpdatedCurrency(data);
      }
    );
  }

  onSwapCurrency(){
    if(!this.onDetailsPage){
      this.currencyExchangeForm.patchValue({
        fromCurrency: this.currencyExchangeForm.get('toCurrency')?.value, 
        toCurrency: this.currencyExchangeForm.get('fromCurrency')?.value
      });
    }
  }

  onConvert() {
    const value = this.currencyExchangeForm.value;
    this.getConversion(value);
  }

  onMoreDetails(){
    const from= this.currencyExchangeForm.value.fromCurrency;
    const to= this.currencyExchangeForm.value.toCurrency;
    const amount= this.currencyExchangeForm.value.amount;
    this.router.navigate(['/details/'+from+'/'+to+'/'+amount],{relativeTo:this.route});
  }
}
