import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { CurrencyExchangerService } from '../currency-exchanger/currency-exchanger.service';
import { CurrencyData } from '../currency-exchanger/exhange.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input() from = ''; 
  @Input() to = ''; 
  private data :Array<Object>= [];
  private rates :Array<any>= [];
  private svg:any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  minimumRate:any=0;
  maximumRate:any=0;
  days:Array<string>=[];
  constructor(private currencyExchangerService:CurrencyExchangerService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.from=changes['from']? changes['from'].currentValue: this.from;
    this.to=changes['to']? changes['to'].currentValue: this.to;
    this.rerenderChart();
  }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    this.getLastDatesOfEachMonth();
    this.rerenderChart();
  }

  rerenderChart(){
    this.data = [];
    this.rates = [];
    this.currencyExchangerService.getMonthlyDataInfo(this.days,this.from,this.to).subscribe((val:Array<CurrencyData>) => {
      const toCurrency = this.to;
      for(let item of val){
        if(item.success){
          this.rates.push(item.rates[toCurrency]);
          this.data.push({ 'Date': item.date, 'Rate': item.rates[toCurrency] });
        }
      }
      this.minimumRate = Math.min(...this.rates);
      this.maximumRate = Math.max(...this.rates);
      this.drawBars(this.data);
    });
  }

  getPreviousYear(){
    const currentYear = new Date().getFullYear();
    const previousYear =  currentYear-1;
    return previousYear;
  }

  checkLeapYear(year:number) {
    const leap = new Date(year, 1, 29).getDate() === 29;
    if (leap) {
        return true;
    } else {
        return false;
    }
  }

  getLastDatesOfEachMonth(){
    const previousYear = this.getPreviousYear();
    let lastDates:Array<string> = ['-01-31','-02-28','-03-31','-04-30','-05-31','-06-30','-07-31','-08-31','-09-30','-10-31','-11-30','-12-31'];
    for(let date in lastDates){
      this.days.push(previousYear+lastDates[date]);
    }
    this.days[1] = this.checkLeapYear(previousYear) ? previousYear+'-02-29' : previousYear+'-02-28';
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
    .domain([this.minimumRate, this.maximumRate])
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







