import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  from:string='EUR';
  to:string='USD';
  amount:any=null;
  constructor() {}
}
