import { ThemeSwitcherService } from './../services/theme-switcher.service';
import { GlobalsService } from './../services/globals.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as _ from 'lodash';

import { App } from './child-classes/App';
import { Container } from 'tsparticles';
import TextParticlesOptions from './child-classes/TextParticlesOptions';

import { ToastController } from '@ionic/angular';
import { AppAssistant } from './child-classes/AppAssistant';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [],
})
export class PortfolioComponent implements OnInit {
  constructor(
    private messenger: MessageService,
    private http: HttpClient,
    public globals: GlobalsService,
    public themeService: ThemeSwitcherService,
    public toast: ToastController,
    public apps: AppAssistant
  ) {}

  @ViewChild('slide1', { read: ElementRef }) slide1: ElementRef;
  @ViewChild('slide2', { read: ElementRef }) slide2: ElementRef;
  @ViewChild('slide3', { read: ElementRef }) slide3: ElementRef;
  @ViewChild('refresher', { read: ElementRef }) refresher: ElementRef;
  @ViewChild('fab', { read: ElementRef }) fab: ElementRef;

  isNewFeatureOpen: boolean = false;
  newFeatureText: string = '';
  isEditingFeatures: boolean = false;
  showNewAppModal: boolean = false;
  newappParticlesOptions: TextParticlesOptions = new TextParticlesOptions({});
  newappName: string = '';
  newappDesc: string = '';
  newappFeature: string = '';
  newappFeatures: string[] = [];
  fabOpen: boolean;

  appDeleteCandidate: App = new App();

  ngOnInit(): void {
    // get all apps from monogdb
    this.apps.refresh();
  }

  unread() {}

  screenClicked(event: any) {
    // event.stopPropagation();
    // this.apps.deleting = false;
    // this.fabOpen = false;
    // this.fab.nativeElement.close();
  }

  addFeaturesClicked(): void {
    this.isNewFeatureOpen = true;
  }

  editFeaturesClicked(): void {
    this.isEditingFeatures = true;
  }

  doneFeaturesClicked(): void {
    this.isEditingFeatures = false;
  }

  newappAddFeature(evt: any) {
    if (this.newappFeature == '') return;

    if (this.newappFeatures.indexOf(this.newappFeature) != -1) {
      this.messenger.add({
        severity: 'warning',
        summary: 'You already added this feature',
        detail: this.newappFeature,
      });
    } else {
      this.newappFeatures = this.newappFeatures.concat([this.newappFeature]);
      this.newappFeature = '';
    }
  }

  newappDeleteFeature(feature: string) {
    this.newappFeatures = this.newappFeatures.filter((e) => e !== feature);
  }

  navigateName(evt: any) {
    if (this.newappName) {
      // animate to next slide
      this.slide1.nativeElement.style.transform = 'translateX(-200%)';
      this.slide2.nativeElement.style.transform = 'translateX(0)';
      this.slide2.nativeElement.style.width = 'unset';
      this.slide2.nativeElement.style.alignItems = 'unset';
    }
  }
  navigateFeatures(direction: string) {
    if (direction == 'next' || direction == 'skip') {
      // animate to next slide
      this.slide2.nativeElement.style.transform = 'translateX(-200%)';
      this.slide3.nativeElement.style.transform = 'translateX(0)';
    } else if (direction == 'back') {
      this.slide2.nativeElement.style.transform = 'translateX(100%)';
      this.slide1.nativeElement.style.transform = 'translateX(0)';
    }
  }
  navigateCreate(direction: string) {
    if (direction == 'back') {
      this.slide3.nativeElement.style.transform = 'translateX(100%)';
      this.slide2.nativeElement.style.transform = 'translateX(0)';
    }
  }

  transitionend(event: any) {
    if (event == null) return;
    switch (event.propertyName) {
      case 'transform':
        this.slide3.nativeElement.firstChild.style.fontSize = '7vw';
        break;
      default:
        break;
    }
  }

  particlesLoaded(event: Container) {}
}
