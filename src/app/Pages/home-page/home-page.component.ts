import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FixerExchangeService } from 'src/app/Services/fixer-exchange.service';
interface ExchangeFormData {
  toCurrency?: string
  fromCurrency?: string
  exchangeAmount?: number
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  currencyConvertHistory:any[]; 
  constructor( private fixerExchangeService :FixerExchangeService) {
    this.currencyConvertHistory = [];
  } 
  
  ngOnInit(): void { 
  }

  // Todo:: Need to move to HOC method
  onAddToHistory(formData:ExchangeFormData) {
    this.currencyConvertHistory.push(formData);
    // Save in the local storage for future use
    localStorage.setItem('convertHistory', JSON.stringify(this.currencyConvertHistory))
  }
}
