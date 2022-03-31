import { PrimeIcons } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

import * as _ from 'underscore';

import { StartupApp } from './classes';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  constructor() {}

  founders: string[] = ['Mark', 'Maria', 'Marcus', 'Robert'];

  isSidebarOpen: boolean = false;

  selectedApp: StartupApp = new StartupApp();

  apps: StartupApp[] = [
    {
      name: 'famILY',
      description: 'Family collaboration app',
      features: [
        'Shared account data',
        'Family meals',
        'Events',
        'Group Messaging',
        'Households visualization',
      ],
      founder: 'Mark',
      timeline: [
        {
          status: 'Minimum Viable Product',
          isProgress: true,
          isDone: false,
        },
        {
          status: 'User Growth',
          isProgress: false,
          isDone: false,
        },
        {
          status: 'Revenue',
          isProgress: false,
          isDone: false,
        },
        {
          status: 'Profitability',
          isProgress: false,
          isDone: false,
        },
      ],
    },
    {
      name: 'Make Me Up',
      description: '3D Interactive Makeup Visualization',
      features: [
        '3D interactive head model',
        'Techniques for Blush, Eyes, Lips, Contouring, Highlights, Bronzing',
      ],
      founder: 'Mark',
      timeline: StartupApp.getDefaultTimeline(),
    },
    {
      name: 'Bioscope',
      description: 'Personality trait dating',
      features: [
        'Connect 23 & Me account',
        'Compatibility algorithm based off 5 Major Personality types with scaling',
      ],
      founder: 'Mark',
      timeline: StartupApp.getDefaultTimeline(),
    },
    {
      name: 'Smart Dog',
      description: 'Smart dog wearable technology',
      features: [],
      founder: 'Mark',
      timeline: StartupApp.getDefaultTimeline(),
    },
    {
      name: 'NFTropolis',
      founder: 'Marcus',
      features: [],
      timeline: StartupApp.getDefaultTimeline(),
    },
    {
      name: 'Flypto',
      founder: 'Marcus',
      features: [],
      timeline: StartupApp.getDefaultTimeline(),
    },
    {
      name: 'Profile Dating',
      founder: 'Marcus',
      features: [],
      timeline: StartupApp.getDefaultTimeline(),
    },
    {
      name: "We 'ed",
      founder: 'Maria',
      features: [],
      timeline: StartupApp.getDefaultTimeline(),
    },
    {
      name: 'Notice Me',
      description: 'Fashion Critique and opinions',
      features: [
        'Free tier: anonymous public critique',
        'Premium tier: curated, specializted stylist critique',
      ],
      founder: 'Robert',
      timeline: StartupApp.getDefaultTimeline(),
    },
  ];

  groupedApps: any = _.groupBy(this.apps, 'founder');

  ngOnInit(): void {}

  appClicked(app: any): void {
    this.isSidebarOpen = true;
    this.selectedApp = app;
  }
}
