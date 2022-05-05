import { ThemeSwitcherService } from './../services/theme-switcher.service';
import { GlobalsService } from './../services/globals.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  MessageService,
  MenuItem,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as _ from 'lodash';

import { App } from './classes/App';
import { Container } from 'tsparticles';
import TextParticlesOptions from './classes/TextParticlesOptions';
import {
  DeleteFeature,
  NewFeature,
  InitiateStartup,
  CreateApp,
  DeleteApp,
  RefreshApps,
} from './accessory/http-handlers';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  animations: [],
})
export class PortfolioComponent implements OnInit {
  constructor(
    private messenger: MessageService,
    private http: HttpClient,
    public globals: GlobalsService,
    public themeService: ThemeSwitcherService,
    private dialog: ConfirmationService
  ) {}

  @ViewChild('slide1', { read: ElementRef }) slide1: ElementRef;
  @ViewChild('slide2', { read: ElementRef }) slide2: ElementRef;
  @ViewChild('slide3', { read: ElementRef }) slide3: ElementRef;

  collaborators: string[] = [];
  isSidebarOpen: boolean = false;
  isNewFeatureOpen: boolean = false;
  selectedApp: App = new App();
  newFeatureText: string = '';
  isEditingFeatures: boolean = false;
  apps: App[] = [];
  groupedApps: any = {};
  actions: MenuItem[];
  showNewAppModal: boolean = false;
  newappParticlesOptions: TextParticlesOptions = new TextParticlesOptions({});
  newappName: string = '';
  newappDesc: string = '';
  newappFeature: string = '';
  newappFeatures: string[] = [];
  loading: boolean = true;
  deleting: boolean = false;

  ngOnInit(): void {
    // get all apps from monogdb
    this.refresh();

    this.actions = [
      {
        icon: 'pi pi-plus',
        command: this.addApp.bind(this),
      },
      {
        icon: 'pi pi-refresh',
        command: () => {
          this.refresh();
          this.messenger.add({
            severity: 'success',
            summary: 'Update',
            detail: 'Data Updated',
          });
        },
      },
      {
        icon: 'pi pi-trash',
        command: (event) => {
          event.originalEvent.stopPropagation();
          this.deleting = !this.deleting;
        },
      },
    ];
  }

  refresh() {
    this.loading = true;
    this.http
      .get(`${this.globals.webapi}/apps`)
      .subscribe(RefreshApps.success().bind(this));
  }

  setApps(apps: App[]) {
    this.groupedApps = _.groupBy(apps, 'originator');
    this.collaborators = Object.keys(this.groupedApps);
    this.loading = false;
  }

  deleteApp(event: any, app: App): void {
    event.stopPropagation();
    this.dialog.confirm({
      message: `${app.name}`,
      header: 'Delete App',

      accept: (event: any) => {
        this.http
          .delete(`${this.globals.webapi}/apps/delete`, { body: app })
          .subscribe(DeleteApp.success(app).bind(this));
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      },
    });
  }

  appClicked(app: any): void {
    this.isSidebarOpen = true;
    this.selectedApp = app;
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

  deleteFeatureClicked(feature: string): void {
    let idx = this.selectedApp.features.findIndex((e) => e == feature);
    let body = {
      _id: this.selectedApp._id,
      feature: feature,
    };
    if (idx != -1) {
      this.http
        .post(`${this.globals.webapi}/features/delete`, body)
        .subscribe(DeleteFeature.success(feature, idx).bind(this));
    }
  }

  newFeatureSaved(): void {
    // check:  empty input
    if (this.newFeatureText == '') {
      return;
    }
    // check:  duplicates
    else if (this.selectedApp.features.indexOf(this.newFeatureText) != -1) {
      this.messenger.add({
        severity: 'warning',
        summary: 'No need for duplicates!',
        detail: "Don't give up :)",
      });
      return;
    }

    this.http
      .post(`${this.globals.webapi}/features/save`, {
        _id: this.selectedApp._id,
        feature: this.newFeatureText,
      })
      .subscribe(NewFeature.success.bind(this));
  }

  initiateStartupClicked(): void {
    this.http
      .post(`${this.globals.webapi}/apps/initiate`, {
        _id: this.selectedApp._id,
      })
      .subscribe(
        InitiateStartup.success.bind(this),
        InitiateStartup.error.bind(this)
      );
  }

  addApp() {
    this.showNewAppModal = true;
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

  createApp(evt: any) {
    let app = new App(this.newappName, 'Lily', this.newappFeatures);

    this.http
      .post(`${this.globals.webapi}/apps/add`, app)
      .subscribe(CreateApp.success(this.newappName, 'Lily').bind(this));

    this.newappName = '';
    this.newappFeature = '';
    this.newappFeatures = [];
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
