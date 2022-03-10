import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router,private route:ActivatedRoute) { }

  goToHome(){
    this.router.navigate(['/']);
  }
  getMoreDetails(toCurrencyType:string){
    this.router.navigate(['/details/EUR/'+toCurrencyType+'/'+null],{relativeTo:this.route});
  }
}
