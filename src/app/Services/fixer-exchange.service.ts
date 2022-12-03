import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';  

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
}