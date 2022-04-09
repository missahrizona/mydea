import { ThemeSwitcherService } from './services/theme-switcher.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { ISourceOptions } from 'tsparticles';
import ParticleOptions from './classes/particleoptions/particle-options';
import BackgroundMaskOptions from './classes/particleoptions/background-mask-options';
import BigParticlesOptions from './classes/particleoptions/big-particles-options';
import MultipleImagesOptions from './classes/particleoptions/multiple-images-options';
import ParallaxOptions from './classes/particleoptions/parallax-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private themeSwitcher: ThemeSwitcherService) {
    this.particlePresets = new ParticleOptions();
  }

  items: MenuItem[] = [];
  isDarkMode: boolean = false;

  particlePresets: ParticleOptions;
  particlesOptions: any;

  ngAfterViewInit(): void {}

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
