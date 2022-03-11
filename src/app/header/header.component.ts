import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../constants';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  EUR_USD = Constants.EUR_USD;
  EUR_GBP = Constants.EUR_GBP;
  constructor(private router: Router,private route:ActivatedRoute) { }

  goToHome(){
    this.router.navigate(['/']);
  }
  getMoreDetails(toCurrencyType:string){
    this.router.navigate(['/details/EUR/'+toCurrencyType+'/'+null],{relativeTo:this.route});
  }
}
