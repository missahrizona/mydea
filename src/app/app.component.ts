import { DOCUMENT } from '@angular/common';
import { ThemeSwitcherService } from './services/theme-switcher.service';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import ParticleOptions from './classes/particleoptions/particle-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private themeSwitcher: ThemeSwitcherService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.particlePresets = new ParticleOptions();
  }

  items: MenuItem[] = [];
  isDarkMode: boolean = false;

  particlePresets: ParticleOptions;
  particlesOptions: any;

  ngAfterViewInit(): void {
    // let html = this.document.querySelector('html') as HTMLHtmlElement;
    // html.setAttribute('style', 'font-size: 1vw !important');
    //html.style.fontSize = '1vw !important';
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

    this.themeSwitcher.particlesOptions.subscribe((options: string) => {
      this.particlesOptions = options;
    });
  }

  particlesLoaded(evt: any): void {}
}
