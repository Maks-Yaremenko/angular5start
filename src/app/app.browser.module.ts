import { NgModule } from '@angular/core';
import { BrowserCacheModule } from '@ngx-utils/cache/browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    BrowserCacheModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
