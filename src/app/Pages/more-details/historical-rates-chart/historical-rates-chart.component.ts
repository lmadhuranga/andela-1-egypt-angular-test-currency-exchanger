import { Component, OnInit, Input} from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { FixerExchangeService } from 'src/app/Services/fixer-exchange.service';

@Component({
  selector: 'app-historical-rates-chart',
  templateUrl: './historical-rates-chart.component.html',
  styleUrls: ['./historical-rates-chart.component.css']
})
export class HistoricalRatesChartComponent implements OnInit {
  
  @Input()
  urlParams:any;

  historicData:{};
  linechart:any = {};
  linechartOk:boolean=false;
  Highcharts = Highcharts;
 
  constructor(private fixerExchangeService: FixerExchangeService) {
    this.historicData = {}; 
  }

  ngOnInit(): void {  
  }

  ngOnChanges() {
    this.getHistoryData()
  }

  // Todo:: need to move to new componetn 
  // load with @ViewChild
  getHichartData(rawData:any) { 
    const datesArr = Object.keys(rawData);
    const fullData:any = []
    const chartData:any = []
    const yearsMonths:any = []
    datesArr.forEach((day, i) => { 
      if(datesArr.length> (i+1)) {
        const currentYear = day.split('-')[0];
        const currentMonth = day.split('-')[1];
        const nextDayMonth = datesArr[(i+1)].split('-')[1];
        if(currentMonth!=nextDayMonth) {
          const value = Object.values(rawData[day]).pop(); 
          fullData.push({value, day})
          chartData.push(value)
          yearsMonths.push(`${currentYear}-${currentMonth}`)
        }
      } 
    });
     
    // set chart data
    const linechartData: any = {
      series: [ { data: chartData, }, ],
      xAxis: { categories: yearsMonths, },
      chart: { type: 'line', },
      title: { text: 'Last 12 month history', },
    };  
    this.linechart = linechartData
    this.linechartOk = true;
  }
 
  
  getHistoryData() { 
    const startDate = this.formatDate(false);
    const endDate = this.formatDate(true);
    const { toCurrency, fromCurrency } = this.urlParams
    const requestData = {
      toCurrency, fromCurrency, startDate, endDate
    }
    
    this.fixerExchangeService.getHistoryData(requestData)
    .subscribe({
      next:(res:any)=> {
        this.getHichartData(res?.rates); 
      },
      error:(error)=>{
        // console.log(`error`,error);
      },
      complete:()=>{
        // console.log(`completed`);
      }
    });
  }

  
  formatDate(isToday:boolean) { 
    let today = new Date();
    let day:any = today?.getDate();

    let month:any = today.getMonth()+1; 
    let year = today.getFullYear();
    
    if(day<10) 
    {
      day='0'+day;
    } 

    if(month<10) 
    {
      month='0'+month;
    }
    if(!isToday){
      return `${year-1}-${month}-${day}`
    }
    return `${year}-${month}-${day}`
  }

}
