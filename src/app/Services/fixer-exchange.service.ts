import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';  
import { FormData } from '../Models/iFormData';
import { HistoryData } from '../Models/iHistoryData';
 

@Injectable({
  providedIn: 'root'
})

export class FixerExchangeService {
  apiUrl:string = environment.FixerApiUrl;

  // Todo:: need to integrate intercepter
  token:string = environment.FixerApiKey; 
 
  constructor( 
    private http: HttpClient,
  ) { 
    console.log(`this.token`,this.token);
  }

  getLatestRates() {
    // search from server
    return this.http.get(`${this.apiUrl}/latest`);
  } 

  rateConvert(formData:FormData) {
    const { toCurrency, fromCurrency, exchangeAmount } = formData;    
    return this.http.get(`${this.apiUrl}/convert?to=${toCurrency}&from=${fromCurrency}&amount=${exchangeAmount}`);
  }
  
  getHistoryData(historyData:HistoryData) {
    const { toCurrency, fromCurrency, startDate, endDate } = historyData;    
    return this.http.get(`${this.apiUrl}/timeseries?start_date=${startDate}&end_date=${endDate}&base=${fromCurrency}&symbols=${toCurrency}`);
  } 
  
  getCurrenciesDetails() {    
    return this.http.get(`${this.apiUrl}/symbols`);
  } 
}