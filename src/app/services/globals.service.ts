import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private deviceDetector: DeviceDetectorService
  ) {
    this.iframe = (() => {
      try {
        if (window.self !== window.top) {
          let html = this.document.querySelector('html') as HTMLHtmlElement;

          html.setAttribute('style', 'font-size: 3.5vw !important');
        }
        return false;
      } catch (e) {
        return true;
      }
    })();
  }

  iframe: boolean;

  envs: any = {
    dev: 'http://localhost:8080',
    prod: 'https://girl-code-346204.uk.r.appspot.com',
  };

  readonly webapi = this.envs.dev;
}
