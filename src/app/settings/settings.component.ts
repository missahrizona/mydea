import { GlobalsService } from './../services/globals.service';
import { HttpClient } from '@angular/common/http';
import { ThemeSwitcherService } from './../services/theme-switcher.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private themeSwitcher: ThemeSwitcherService,
    private http: HttpClient,
    private globals: GlobalsService
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
