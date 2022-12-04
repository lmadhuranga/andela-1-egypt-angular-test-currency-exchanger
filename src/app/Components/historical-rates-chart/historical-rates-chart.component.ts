import { Component, OnInit, Input} from '@angular/core';
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
  
  constructor(private fixerExchangeService: FixerExchangeService) {
    this.historicData = [];
  }

  ngOnInit(): void { 
    this.getHistoryData();
  }

  formatData(rawData:any) { 
    const datesArr = Object.keys(rawData);
    const chartData:any = []
    datesArr.forEach((day, i) => { 
      if(datesArr.length> (i+1)) {
        const currentMonth = day.split('-')[1]
        const nextDayMonth = datesArr[(i+1)].split('-')[1]
        console.log(`currentMonth`,currentMonth, nextDayMonth);
        if(currentMonth!=nextDayMonth) {
          chartData.push({...rawData[day], date:day})
        }
      } 
    });
    this.historicData = chartData; 
  }
  
  getHistoryData() { 
    const startDate = this.formatDate(false);
    const endDate = this.formatDate(true);
    const requestData = {
      toCurrency : this.urlParams['toCurrency'],
      fromCurrency: this.urlParams['fromCurrency'],
      startDate,
      endDate
    }
    this.fixerExchangeService.getHistoryData(requestData)
    .subscribe({
      next:(res:any)=> { 
        this.formatData(res?.rates);
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
