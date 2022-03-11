import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { concatMap, forkJoin, from } from 'rxjs';
import { CurrencyExchangerService } from '../currency-exchanger/currency-exchanger.service';
import { CurrencyData } from '../currency-exchanger/exhange.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  private data :Array<Object>= [
    // {"Framework": "Jan", "Stars": "6", "Released": "2014"},
    // {"Framework": "Feb", "Stars": "5", "Released": "2013"},
    // {"Framework": "March", "Stars": "6", "Released": "2016"},
    // {"Framework": "April", "Stars": "2", "Released": "2010"},
    // {"Framework": "May", "Stars": "4", "Released": "2011"},
    // {"Framework": "June", "Stars": "7", "Released": "2014"},
    // {"Framework": "July", "Stars": "8", "Released": "2013"},
    // {"Framework": "August", "Stars": "1", "Released": "2016"},
    // {"Framework": "September", "Stars": "2", "Released": "2010"},
    // {"Framework": "October", "Stars": "7", "Released": "2011"},
    // {"Framework": "November", "Stars": "9", "Released": "2010"},
    // {"Framework": "December", "Stars": "1", "Released": "2011"}
  ];
  private svg:any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  days:Array<string>=[];
  constructor(private currencyExchangerService:CurrencyExchangerService) { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    this.getLastDates();
    // this.data = [];
    // from(this.days).pipe(
    //   concatMap(param => this.currencyExchangerService.getMonthlyData(param))
    // ).subscribe((val:any) => {
    //   this.data.push({ 'Date': val.date, 'Rate': val.rates.USD });
    //   this.drawBars(this.data);
    // });
    this.data = [];
    this.currencyExchangerService.getMonthlyDataInfo(this.days).subscribe((val:any) => {
      console.log(val);
      for(let item of val){
        this.data.push({ 'Date': item.date, 'Rate': item.rates.USD });
      }
      this.drawBars(this.data);
    });
  }

  getPreviousYear(){
    const currentYear = new Date().getFullYear();
    const previousYear =  currentYear-1;
    return previousYear;
  }

  // program to check leap year
  checkLeapYear(year:number) {
  const leap = new Date(year, 1, 29).getDate() === 29;
    if (leap) {
        return true;
    } else {
        return false;
    }
  }

  getLastDates(){
    const previousYear = this.getPreviousYear();
    this.days.push(previousYear+'-01-31');
    let feb = this.checkLeapYear(previousYear) ? previousYear+'-02-29' : previousYear+'-02-28';
    this.days.push(feb);
    // this.days.push(previousYear+'-03-31');
    // this.days.push(previousYear+'-04-30');
    // this.days.push(previousYear+'-05-31');
    // this.days.push(previousYear+'-06-30');
    // this.days.push(previousYear+'-07-31');
    // this.days.push(previousYear+'-08-31');
    // this.days.push(previousYear+'-09-30');
    // this.days.push(previousYear+'-10-31');
    // this.days.push(previousYear+'-11-30');
    // this.days.push(previousYear+'-12-31');
  }


  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Date))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 10])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: { Date: string; }) => x(d.Date))
    .attr("y", (d: { Rate: d3.NumberValue; }) => y(d.Rate))
    .attr("width", x.bandwidth())
    .attr("height", (d: { Rate: d3.NumberValue; }) => this.height - y(d.Rate))
    .attr("fill", "#d04a35");
}

}







