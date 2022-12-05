import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixerExchangeService } from 'src/app/Services/fixer-exchange.service';
interface ExchangeFormData {
  toCurrency?: string
  fromCurrency?: string
  exchangeAmount?: number
}
 
@Component({
  selector: 'app-more-details-page',
  templateUrl: './more-details-page.component.html',
  styleUrls: ['./more-details-page.component.css']
})

export class MoreDetailsPageComponent implements OnInit {
  
  currencies: string[]; 
  currencyConvertHistory:any[]; 
  urlParams:any; 
  currenciesWithNames:string[]; 
  fromCurrency?:string; 
  toCurrency?:string; 
  currencyFullName:string;

  constructor(
    private fixerExchangeService: FixerExchangeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
    this.currencies = [];
    this.currencyConvertHistory = [];
    this.currenciesWithNames = [];
    this.toCurrency = '';
    this.fromCurrency = '';
    this.currencyFullName = '';
  }

  ngOnInit(): void {   
    // Todo:: add asyc function
    this.getAvailebleCurrencies(); 
    this.activatedRoute.queryParams
      .subscribe(params => { 
        // console.log(`URL CHANGED`, params);
        this.fromCurrency = params['fromCurrency'];
        this.toCurrency = params['toCurrency'];
        this.setFullName(this.fromCurrency)
        this.urlParams = {...params};
      }
    );
 
  }
  
  setFullName(fromCurrency:string|any) { 
    this.currencyFullName = this.currenciesWithNames[fromCurrency];
  }

  getAvailebleCurrencies() {  
    this.fixerExchangeService.getCurrenciesDetails()
    .subscribe({
      next:(res:any)=> { 
        // console.log(`res`,res);
        this.currenciesWithNames = res?.symbols;
        this.setFullName(this.fromCurrency);
      },
      error:(error)=>{
        // console.log(`error`,error);
      },
      complete:()=>{
        // console.log(`completed`);
      }
    });
  } 

  onAddToHistory(formData:ExchangeFormData) {  
    this.urlParams = {...formData};
  }
  
  backToHomePage(event:any) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

}
