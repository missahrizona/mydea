import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.darkMode.subscribe((e) => {
      this.toggleDarkMode(e);
    });
  }

  darkMode = new BehaviorSubject<boolean>(false);

  particlesOptions = new BehaviorSubject<string>('Background Mask');

  /*
    Citation
        Source - https://github.com/yigitfindikli/primeng-dynamic-theming
  */
  toggleDarkMode(darkMode: boolean): void {
    var themeLink: HTMLLinkElement = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    switch (darkMode) {
      case true:
        themeLink.href = themeLink.href.replace(/light/i, 'dark');
        break;
      case false:
        themeLink.href = themeLink.href.replace(/dark/i, 'light');
        break;
    }
  }

  changeColorTheme(color: string): void {
    var themeLink: HTMLLinkElement = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    themeLink.href = themeLink.href.replace(/teal|blue|indigo|purple/i, color);
  }
}
