import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { ServerCacheModule } from '@ngx-utils/cache/server';
import { ServerCookiesModule } from '@ngx-utils/cookies/server';
import { ServerPrebootModule } from 'preboot/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerCacheModule.forRoot(),
    ServerCookiesModule.forRoot(),
    ServerPrebootModule.recordEvents({
      appRoot: 'ap-root'
    }),
    ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
