import { Component, OnDestroy} from '@angular/core';
import { CurrencyExchangerService } from '../currency-exchanger/currency-exchanger.service';
import { Subscription } from 'rxjs';
import { ConversionList } from '../exhange.model';

@Component({
  selector: 'app-currency-cards',
  templateUrl: './currency-cards.component.html',
  styleUrls: ['./currency-cards.component.scss']
})
export class CurrencyCardsComponent implements OnDestroy {

  currencyData: Array<ConversionList> = [];
  subscription: Subscription;
  constructor(private currencyExchangerService:CurrencyExchangerService) {
    this.subscription = this.currencyExchangerService.getUpdatedCurrency().subscribe(rates => {
      if (rates.data) {
        this.currencyData=rates.data;
      } else {
        this.currencyData = [];
        alert("Unable to fetch data");
      }
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


