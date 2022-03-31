import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { MenuItem } from 'primeng/api';

import NET from 'vanta/dist/vanta.net.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor() {}

  @ViewChild('vantaWrap') vantaWrap: any;

  items: MenuItem[] = [];

  ngAfterViewInit(): void {
    NET({
      el: this.vantaWrap.nativeElement,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xd2d2,
      backgroundColor: 0x1525,
      maxDistance: 10.0,
      spacing: 10.0,
    });
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
    ];
  }
}
