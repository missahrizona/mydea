import { SaveDarkMode } from './accessory/http-handlers';
import { GlobalsService } from './../services/globals.service';
import { HttpClient } from '@angular/common/http';
import { ThemeSwitcherService } from './../services/theme-switcher.service';
import { Component, Input, OnInit } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private themeSwitcher: ThemeSwitcherService,
    private http: HttpClient,
    private globals: GlobalsService,
    private toast: ToastController
  ) {}

  ngOnInit(): void {
    //this.http.get(`${this.globals.webapi}/userpreferences`);
  }

  checked: boolean = this.themeSwitcher.darkMode.getValue();

  tealTheme: boolean = true;
  blueTheme: boolean = false;
  purpleTheme: boolean = false;
  indigoTheme: boolean = false;

  toggleDarkMode() {
    this.themeSwitcher.darkMode.next(this.checked);

    let body: any = { darkMode: this.checked };
    this.http
      .post(`${this.globals.webapi}/settings/save`, body)
      .subscribe(SaveDarkMode.succeed.bind(this));
  }

  changeTheme(color: string): void {
    this.themeSwitcher.changeColorTheme(color);

    this.tealTheme = color == 'teal' ? true : false;
    this.blueTheme = color == 'blue' ? true : false;
    this.purpleTheme = color == 'purple' ? true : false;
    this.indigoTheme = color == 'indigo' ? true : false;
  }

  setBackground(backgroundName: string): void {
    this.themeSwitcher.particlesOptions.next(backgroundName);
  }
}
