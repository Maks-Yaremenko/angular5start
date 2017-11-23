import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlatformService } from './core/platform.service';
import { ApiModule } from './api/api.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'angular-app' }),
    AppRoutingModule,
    ApiModule,
    FormsModule
  ],
  providers: [
    PlatformService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
