import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.darkMode.subscribe((e) => {
      this.changeTheme(e);
    });
  }

  darkMode = new BehaviorSubject<boolean>(false);

  changeTheme(darkMode: boolean) {
    var themeLink: HTMLLinkElement = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    switch (darkMode) {
      case true:
        themeLink.href = 'material-compact-indigo-dark.css';
        break;
      case false:
        themeLink.href = 'material-compact-indigo-light.css';
        break;
    }
  }
}
