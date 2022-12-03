import { Component, OnInit } from '@angular/core';
import { FixerExchangeService } from 'src/app/Services/fixer-exchange.service';

interface Rates 
{
  [key: string]: any; 
  name: string;
}
interface Payload 
{
  "base": string,
  "date": string,
  "rates": Rates,
  "success": boolean,
  "timestamp": Number
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private fixerExchangeService: FixerExchangeService
  ) { }
  currencies: string[] = [];

  ngOnInit(): void {
    this.getAvailebleCurrencies()
  }
  
  // Todo:: need to switch currenciess
  switchCurrencies() {
    console.log(`switch currencies`);
  }

  getAvailebleCurrencies() {  
    this.fixerExchangeService.getLatestRates()
    .subscribe({
      next:(res:any)=> { 
        this.currencies = Object.keys(res?.rates);
        console.log(`currencies`,this.currencies);
      },
      error:(error)=>{
        console.log(`error`,error);
      },
      complete:()=>{console.log(`completed`);}
    })
  }
}
