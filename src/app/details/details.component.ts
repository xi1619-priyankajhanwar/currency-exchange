import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from '../constants';
import { CurrencyExchangerService } from '../currency-exchanger/currency-exchanger.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  from: string;
  to:string;
  amount:any=null;
  baseCurrency:string='EUR-European Union Euro';
  BACK_TO_HOME = Constants.BACK_TO_HOME;
  constructor(private router: Router,private route: ActivatedRoute, private currencyExchangerService: CurrencyExchangerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.from = params['from'];
      this.to = params['to'];
      this.amount = params['amount'];
      this.baseCurrency = this.from === 'EUR' ? 'EUR-European Union Euro' : this.getBaseCurrency();
    });
  }

  getBaseCurrency(){
    return this.currencyExchangerService.getCurrencyName(this.from);
  }
  goToHome(){
    this.router.navigate(['/']);
  }

}
