import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { CurrencyExchangerService } from '../currency-exchanger/currency-exchanger.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  from: any;
  to:any;
  amount:any=null;
  baseCurrency:string='EUR-European Union Euro';
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
