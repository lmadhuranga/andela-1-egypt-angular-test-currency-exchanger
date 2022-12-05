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

  historicData:any[];

  Highcharts = Highcharts;
  linechart: any = {
    series: [ { data: [1, 2, 3], },
    ],
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', ],
    },
    chart: {
      type: 'line',
    },
    title: {
      text: 'Last 12 month history',
    },
  };
  constructor(private fixerExchangeService: FixerExchangeService) {
    this.historicData = [];
  }

  ngOnInit(): void { 
    this.getHistoryData();
  }

  ngOnChanges() {
    this.getHistoryData()
  }

  formatData(rawData:any) { 
    const datesArr = Object.keys(rawData);
    const chartData:any = []
    datesArr.forEach((day, i) => { 
      if(datesArr.length> (i+1)) {
        const currentMonth = day.split('-')[1];
        const nextDayMonth = datesArr[(i+1)].split('-')[1];
        if(currentMonth!=nextDayMonth) {
          const value = Object.values(rawData[day]).pop(); 
          chartData.push({value, day})
        }
      } 
    });
    return chartData;  
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
        this.historicData = this.formatData(res?.rates);
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
