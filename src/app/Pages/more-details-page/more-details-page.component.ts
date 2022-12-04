import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixerExchangeService } from 'src/app/Services/fixer-exchange.service';

 
@Component({
  selector: 'app-more-details-page',
  templateUrl: './more-details-page.component.html',
  styleUrls: ['./more-details-page.component.css']
})
export class MoreDetailsPageComponent implements OnInit {

  currencies: string[]; 
  currenciesWithNames:string[]; 
  fromCurrency:string; 
  currencyFullName:string; 
  constructor(
    private fixerExchangeService: FixerExchangeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
    this.currencies = [];
    this.currenciesWithNames = [];
    this.fromCurrency = '';
    this.currencyFullName = '';
  }

  ngOnInit(): void { 
    this.currencies = this.getMostPopularCurrencies(); 
    this.getAvailebleCurrencies(); 
    this.activatedRoute.queryParams
      .subscribe(params => {
        console.log(params['fromCurrency']); // { orderby: "price" } 
        this.fromCurrency = params['fromCurrency']
      }
    );
  }

  getAvailebleCurrencies() {  
    this.fixerExchangeService.getCurrenciesDetails()
    .subscribe({
      next:(res:any)=> { 
        console.log(`res`,res);
        const currenciesWithNames = res?.symbols;
        const fromCurrency:any = this.fromCurrency;
        console.log(`fromCurrency`,currenciesWithNames);
        this.currencyFullName = currenciesWithNames[fromCurrency]
      },
      error:(error)=>{
        // console.log(`error`,error);
      },
      complete:()=>{
        // console.log(`completed`);
      }
    });
  } 


  getMostPopularCurrencies() {

    const storedConvertHistory:any =  localStorage.getItem('convertHistory')
    let allCurrencies = JSON.parse(storedConvertHistory);
    console.log(`allCurrencies`,allCurrencies);
    // Defining the unique cities from the above
    // array by using forEach loop
    let unique_currenies:string[] = [];
    let duplicated_currenies:any = {}; 
    if(allCurrencies.length>0) { 
      allCurrencies.forEach((c:any) => {
        const { fromCurrency, toCurrency } = c;
        if (!unique_currenies.includes(fromCurrency)) {
          unique_currenies.push(fromCurrency);
        }
        else {
          duplicated_currenies[fromCurrency] = fromCurrency;
        }
        
        if (!unique_currenies.includes(toCurrency)) {
          unique_currenies.push(toCurrency);
        }
        else {
          duplicated_currenies[toCurrency] = toCurrency;
        }
      }); 
      return Object.keys(duplicated_currenies)
    }
    else {
      return ['EUR', 'USD'] 
    } 
  }

  backToHomePage(event:any) {
    event.preventDefault();
    this.router.navigate(['/']);
  }
}
