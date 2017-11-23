import { NgModule } from '@angular/core';
import { BrowserCacheModule } from '@ngx-utils/cache/browser';
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';
import { BrowserPrebootModule } from 'preboot/browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    BrowserCacheModule.forRoot(),
    BrowserCookiesModule.forRoot(),
    BrowserPrebootModule.replayEvents()
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
