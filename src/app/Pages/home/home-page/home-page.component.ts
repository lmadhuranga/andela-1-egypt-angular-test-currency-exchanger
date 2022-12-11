import { Component, OnInit } from '@angular/core';
import { FormData } from 'src/app/Models/iFormData';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  currencyConvertHistory:any[]; 
  popularPairs:any[];

  constructor() {
    this.currencyConvertHistory = [];
    this.popularPairs = [];
  } 
  
  ngOnInit(): void { } 

  // Todo:: Need to move to HOC method
  onAddToHistory( formData:FormData ) {
    this.currencyConvertHistory.push(formData);
    // Save in the local storage for future use
    localStorage.setItem('convertHistory', JSON.stringify(this.currencyConvertHistory));
    this.popularPairs = this.tofindDuplicates(this.currencyConvertHistory);
  } 

  // Find the duplicated values in array
  tofindDuplicates (historyArr:any) {
    const pairedArr = historyArr.map((r:any)=> `${r.fromCurrency}-${r.toCurrency}`)
    const counterObj:any = {};
    
    pairedArr.forEach((e:any) => { 
      if(counterObj.hasOwnProperty(e)) {
        counterObj[e] = (counterObj[e] + 1)
      }
      else {
        counterObj[e] = 1;
      }
    }); 

    let outputDataArr = []
    for (const key in counterObj) {
      if(counterObj[key]>1) { 
        outputDataArr.push(key) 
      }
    } 
    return outputDataArr;
  } 
}