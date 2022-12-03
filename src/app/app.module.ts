import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { MoreDetailsPageComponent } from './Pages/more-details-page/more-details-page.component';
import { CurrencyConvertorComponent } from './Components/currency-convertor/currency-convertor.component';
import { HeaderComponent } from './Components/header/header.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MoreDetailsPageComponent,
    CurrencyConvertorComponent,
    HeaderComponent,
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
