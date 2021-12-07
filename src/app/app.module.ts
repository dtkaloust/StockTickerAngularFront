import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedService } from './shared/services/feed.service';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FeedSelectorComponent } from './feed-selector/feed-selector.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import {
  SearchDialog,
  StockSearchComponent,
} from './stock-search/stock-search.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    FeedSelectorComponent,
    FeedListComponent,
    StockSearchComponent,
    SearchDialog,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
  ],
  providers: [
    FeedService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
