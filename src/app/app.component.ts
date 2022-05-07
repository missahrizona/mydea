import { DOCUMENT } from '@angular/common';
import { ThemeSwitcherService } from './services/theme-switcher.service';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import ParticleOptions from './classes/particleoptions/particle-options';
import { ISourceOptions } from 'tsparticles';
import BackgroundMaskOptions from './classes/particleoptions/background-mask-options';
import BigParticlesOptions from './classes/particleoptions/big-particles-options';
import MultipleImagesOptions from './classes/particleoptions/multiple-images-options';
import ParallaxOptions from './classes/particleoptions/parallax-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private themeSwitcher: ThemeSwitcherService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.particlePresets = new ParticleOptions();
    this.particlePreset = this.particlePresets.backgroundMask(this.isDarkMode);
  }

  items: MenuItem[] = [];
  isDarkMode: boolean = false;

  particlePresets: ParticleOptions;
  particlePreset: ISourceOptions;
  particlePresetName: string;

  _reload: boolean = false;

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
      this.particlePreset = this.getParticlePreset(this.particlePresetName);
      this.reload();
    });

    this.themeSwitcher.particlesOptions.subscribe((options: string) => {
      this.particlePresetName = options;
      this.particlePreset = this.getParticlePreset(this.particlePresetName);
    });
  }

  getParticlePreset(presetName: string): ISourceOptions {
    switch (presetName) {
      case 'Background Mask':
        return new BackgroundMaskOptions(this.isDarkMode);
      case 'Big Particles':
        return new BigParticlesOptions(this.isDarkMode);
      case 'Multiple Images':
        return new MultipleImagesOptions(this.isDarkMode);
      case 'Parallax':
        return new ParallaxOptions(this.isDarkMode);
      default:
        return new BackgroundMaskOptions(this.isDarkMode);
    }
  }
  reload() {
    setTimeout(() => (this._reload = false), 10);
    setTimeout(() => (this._reload = true), 20);
  }

  particlesLoaded(evt: any): void {}
}
