import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FixerExchangeService } from 'src/app/Services/fixer-exchange.service';
 

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
 
  currencies: string[];
  constructor( private fixerExchangeService :FixerExchangeService) {
    this.currencies = []; 
  } 

 
  ngOnInit(): void {
    this.getAvailebleCurrencies()
  } 

  getAvailebleCurrencies() {  
    this.fixerExchangeService.getLatestRates()
    .subscribe({
      next:(res:any)=> { 
        this.currencies = Object.keys(res?.rates);
        // console.log(`currencies`,this.currencies);
      },
      error:(error)=>{
        // console.log(`error`,error);
      },
      complete:()=>{
        // console.log(`completed`);
      }
    });
  } 
}
