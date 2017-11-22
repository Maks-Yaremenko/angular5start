import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class PlatformService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  isServer() {
    return isPlatformServer(this.platformId);
  }
}
