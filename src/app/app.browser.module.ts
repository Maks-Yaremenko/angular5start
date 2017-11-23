import { NgModule } from '@angular/core';
import { BrowserCacheModule } from '@ngx-utils/cache/browser';
import { BrowserCookiesModule } from '@ngx-utils/cookies/src/browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    BrowserCacheModule.forRoot(),
    BrowserCookiesModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
