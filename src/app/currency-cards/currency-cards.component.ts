import { Component, OnDestroy} from '@angular/core';
import { CurrencyExchangerService } from '../currency-exchanger/currency-exchanger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-cards',
  templateUrl: './currency-cards.component.html',
  styleUrls: ['./currency-cards.component.scss']
})
export class CurrencyCardsComponent implements OnDestroy {

  currencyData: any = {};
  subscription: Subscription;
  constructor(private currencyExchangerService:CurrencyExchangerService) {
    // this.subscription = this.currencyExchangerService.getUpdatedCurrency().subscribe(data => {
    //   if (data.text.success) {
    //     this.currencyData=data.text.rates;
    //   } else {
    //     this.currencyData = {};
    //     alert("Unable to fetch data");
    //   }
    // });
  }
  
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}


