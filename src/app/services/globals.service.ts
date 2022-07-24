import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

declare const window: Window;

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public platform: Platform
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

  backgroundImage$: BehaviorSubject<string> = new BehaviorSubject('');

  iframe: boolean;

  readonly envs: any = {
    dev: 'http://localhost:8080',
    prod: 'https://mydea-api.vercel.app',
  };

  readonly env =
    window.location.hostname.toLowerCase().indexOf('localhost') != -1
      ? 'dev'
      : 'prod';
  readonly webapi = this.envs[this.env];
}
