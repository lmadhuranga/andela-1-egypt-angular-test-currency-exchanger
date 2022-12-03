import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FixerExchangeService } from 'src/app/Services/fixer-exchange.service';

interface Rates 
{
  [key: string]: any; 
  name: string;
}

interface FormData {
  toCurrency: string
  fromCurrency: string
  exchangeAmount: DoubleRange
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
  exchangeForm: FormGroup; 
  exchangeRate: string='0.0'; 
  constructor(
    private fixerExchangeService: FixerExchangeService
  ) { 
    this.exchangeForm = new FormGroup({
      exchangeAmount: new FormControl(0, [Validators.required]),
      fromCurrency: new FormControl('USD', [Validators.required]),
      toCurrency: new FormControl('AED', [Validators.required]),
    }); 
  } 

  currencies: string[] = [];

  ngOnInit(): void {
    this.getAvailebleCurrencies()
  }
  
  f() {
    return this.exchangeForm.value;
  }

  ratesConvert() {
    const formData:FormData = this.f();
    this.fixerExchangeService.rateConvert(formData)
    .subscribe({
      next:(res:any)=> { 
        this.exchangeRate = res?.result
      },
      error:(error)=>{
        // console.log(`error`,error);
      },
      complete:()=>{
        // console.log(`completed`);
      }
    });
  }
  
  reset() {
    // this.errors = {};
  }
  
  // Todo:: need to switch currenciess
  switchCurrencies(event:any) {
    event?.preventDefault();
    const formData:FormData = this.f();
    const fromCurrency:string = formData['fromCurrency'];
    const toCurrency:string = formData['toCurrency'];
    this.exchangeForm.patchValue({
      fromCurrency:toCurrency,
      toCurrency:fromCurrency
    });
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
