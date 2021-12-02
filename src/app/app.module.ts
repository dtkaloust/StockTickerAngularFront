import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedService } from './shared/services/feed.service';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { StockComponent } from './stock/stock.component';

@NgModule({
  declarations: [AppComponent, FeedComponent, StockComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [FeedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
