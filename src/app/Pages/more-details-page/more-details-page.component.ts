import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-more-details-page',
  templateUrl: './more-details-page.component.html',
  styleUrls: ['./more-details-page.component.css']
})
export class MoreDetailsPageComponent implements OnInit {

  currencies: string[]; 
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
    this.currencies = [];
  }

  ngOnInit(): void { 
    this.currencies = this.getMostPopularCurrencies();
    this.activatedRoute.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" } 
      }
    );
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
