import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FixerExchangeService } from 'src/app/Services/fixer-exchange.service';

interface Rates 
{
  [key: string]: any; 
  name: string;
}

interface FormData {
  toCurrency?: string
  fromCurrency?: string
  exchangeAmount?: number
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
  selector: 'app-currency-convertor',
  templateUrl: './currency-convertor.component.html',
  styleUrls: ['./currency-convertor.component.css']
})

export class CurrencyConvertorComponent implements OnInit {

  exchangeForm: FormGroup; 
  exchangeRate: string; 
  currencies: string[];
  // convertHistory:[{ fromCurrency: string, toCurrency: string }];
  convertHistory:FormData[];

  constructor(
    private fixerExchangeService: FixerExchangeService,
    private router: Router
  ) {
     
    this.exchangeRate = '0.0';
    this.currencies = [];

    this.convertHistory=[];  

    this.exchangeForm = new FormGroup({
      exchangeAmount: new FormControl(1, [Validators.required]),
      fromCurrency: new FormControl('EUR', [Validators.required]),
      toCurrency: new FormControl('USD', [Validators.required]),
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
    // Todo:: should be disable until input amount enter
    const formData:FormData = this.f();
    const { fromCurrency, toCurrency } = formData;
    // Added to history
    this.convertHistory.unshift({ fromCurrency, toCurrency })
    console.log(`this.convertHistory`,this.convertHistory);
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
    const fromCurrency:any = formData['fromCurrency'];
    const toCurrency:any = formData['toCurrency'];
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
    
    // Store in localstorage convert history
    localStorage.setItem('convertHistory', JSON.stringify(this.convertHistory));

    // Redirect to more detils page with 
    // parameters amount base currency, target currency and amount
    const formData:FormData = this.f();
    const { fromCurrency, toCurrency, exchangeAmount } = formData; 
    this.router.navigate(['/more-detials'], { queryParams: { fromCurrency, toCurrency, exchangeAmount }});
  }
 
}
