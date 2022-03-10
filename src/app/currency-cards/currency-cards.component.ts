import { Component, OnInit ,OnDestroy} from '@angular/core';
import { CurrencyExchangerService } from '../currency-exchanger/currency-exchanger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-cards',
  templateUrl: './currency-cards.component.html',
  styleUrls: ['./currency-cards.component.scss']
})
export class CurrencyCardsComponent implements OnInit, OnDestroy {
  currencyData: any = {};
  subscription: Subscription;
  constructor(private currencyExchangerService:CurrencyExchangerService) {
    this.subscription = this.currencyExchangerService.getUpdatedCurrency().subscribe(data => {
      if (data) {
        this.currencyData=data.text.rates;
        console.log(this.currencyData);
      } else {
        this.currencyData = {};
      }
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


