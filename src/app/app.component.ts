import { ThemeSwitcherService } from './services/theme-switcher.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { MenuItem } from 'primeng/api';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private themeSwitcher: ThemeSwitcherService) {}

  items: MenuItem[] = [];
  isDarkMode: boolean = false;

  ngAfterViewInit(): void {
    particlesJS.load(
      'animated-background',
      '../assets/json/particlesjs-config.json'
    );
  }

  ngOnInit() {
    this.items = [
      {
        label: 'App Store',
        icon: PrimeIcons.TH_LARGE,
        routerLink: ['/home'],
      },
      {
        label: 'Org',
        icon: PrimeIcons.SITEMAP,
        routerLink: ['/org'],
      },
      {
        label: 'Metrics',
        icon: PrimeIcons.CHART_LINE,
        routerLink: ['/metrics'],
      },
      {
        label: 'Settings',
        icon: PrimeIcons.COG,
        routerLink: ['/settings'],
      },
    ];

    this.themeSwitcher.darkMode.subscribe((val) => {
      this.isDarkMode = val;
    });
  }
}
