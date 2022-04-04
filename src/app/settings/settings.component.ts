import { ThemeSwitcherService } from './../services/theme-switcher.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(private themeSwitcher: ThemeSwitcherService) {}

  ngOnInit(): void {}

  checked: boolean = this.themeSwitcher.darkMode.getValue();

  toggleDarkMode() {
    this.themeSwitcher.darkMode.next(this.checked);
  }
}
