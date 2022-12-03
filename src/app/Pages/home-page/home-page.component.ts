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
  exchangeRate: string; 
  currencies: string[];

  constructor(
    private fixerExchangeService: FixerExchangeService
  ) { 
    this.exchangeRate = '0.0';
    this.currencies = [];

    this.exchangeForm = new FormGroup({
      exchangeAmount: new FormControl(0, [Validators.required]),
      fromCurrency: new FormControl('USD', [Validators.required]),
      toCurrency: new FormControl('AED', [Validators.required]),
    });
  } 

 
  ngOnInit(): void {
    this.getAvailebleCurrencies();
    // if form valu change rest to init state 
    this.exchangeForm.valueChanges.subscribe(selectedValue  => {
      this.reset();
    })
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
    this.exchangeRate = '0.00';
  }
   
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

  redirectToDetialesPage(event:any) {
    event.preventDefault();
    console.log(`reditc next page called`);
    // Todo:: redirect to more detils page with 
    // parameters amount base currency, target currency and amount
  }
 
}
