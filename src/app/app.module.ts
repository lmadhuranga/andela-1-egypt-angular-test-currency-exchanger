import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { MoreDetailsPageComponent } from './Pages/more-details-page/more-details-page.component';
import { CurrencyConvertorComponent } from './Components/currency-convertor/currency-convertor.component';
import { HeaderComponent } from './Components/header/header.component';
import { HistoricalRatesChartComponent } from './Components/historical-rates-chart/historical-rates-chart.component';
import { ConvertHistoryComponent } from './Components/convert-history/convert-history.component';
import { AuthInterceptorService } from './Helpers/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MoreDetailsPageComponent,
    CurrencyConvertorComponent,
    HeaderComponent,
    HistoricalRatesChartComponent,
    ConvertHistoryComponent, 
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    HighchartsChartModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
