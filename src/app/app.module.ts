import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CurrencyExchangerComponent } from './currency-exchanger/currency-exchanger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyCardsComponent } from './currency-cards/currency-cards.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyExchangerComponent,
    CurrencyCardsComponent,
    HomeComponent,
    DetailsComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
