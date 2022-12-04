import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit( ): void {
  }

  redirectToDetialesPage(event:any, fromCurrency?:string, toCurrency?:string) {
    event.preventDefault();
    // Redirect to more detils page with 
    // parameters amount base currency, target currency 
    this.router.navigate(['/more-detials'], { queryParams: { fromCurrency, toCurrency }});
  }

}
