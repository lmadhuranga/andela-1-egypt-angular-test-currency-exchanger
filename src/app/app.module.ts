import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyConvertorComponent } from './Components/currency-convertor/currency-convertor.component';
import { HeaderComponent } from './Components/header/header.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { HomePageComponent } from './Pages/home/home-page/home-page.component';
import { MoreDetailsPageComponent } from './Pages/more-details/more-details-page/more-details-page.component';
import { ConvertHistoryComponent } from './Pages/home/convert-history/convert-history.component';
import { HistoricalRatesChartComponent } from './Pages/more-details/historical-rates-chart/historical-rates-chart.component';


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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
