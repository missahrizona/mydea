import { ThemeSwitcherService } from './../services/theme-switcher.service';
import { GlobalsService } from './../services/globals.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService, PrimeIcons, MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { App, Timeline } from './classes';

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
    public themeService: ThemeSwitcherService
  ) {}

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

  ngOnInit(): void {
    // get all apps from monogdb
    this.http.get(`${this.globals.webapi}/apps`).subscribe((data) => {
      this.groupedApps = _.groupBy(data, 'originator');
      this.collaborators = Object.keys(this.groupedApps);
    });

    this.actions = [
      {
        icon: 'pi pi-plus',
        command: this.addApp.bind(this),
      },
      {
        icon: 'pi pi-refresh',
        command: () => {
          this.messenger.add({
            severity: 'success',
            summary: 'Update',
            detail: 'Data Updated',
          });
        },
      },
      {
        icon: 'pi pi-trash',
        command: () => {
          this.messenger.add({
            severity: 'error',
            summary: 'Delete',
            detail: 'Data Deleted',
          });
        },
      },
    ];
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
    let index = this.selectedApp.features.findIndex((e) => e == feature);
    if (index != -1) {
      this.selectedApp.features.splice(index, 1);
    }

    this.http
      .post(`${this.globals.webapi}/features/delete`, {
        _id: this.selectedApp._id,
        feature: feature,
      })
      .subscribe((res: any) => {
        if (res.acknowledged && res.modifiedCount == 1) {
          this.messenger.add({
            severity: 'success',
            summary: 'Deleted feature: ' + feature,
            detail: 'Not feeling it?',
          });
        }
      });
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
    } else {
      this.selectedApp.features.push(this.newFeatureText);
    }

    this.http
      .post(`${this.globals.webapi}/features/save`, {
        _id: this.selectedApp._id,
        feature: this.newFeatureText,
      })
      .subscribe((res: any) => {
        if (res.acknowledged && res.modifiedCount == 1) {
          this.messenger.add({
            severity: 'success',
            summary: 'New feature added!',
            detail: 'Keep it up :)',
          });
        }
      });

    this.isNewFeatureOpen = false;
    this.newFeatureText = '';
  }

  initiateStartupClicked(): void {
    this.http
      .post(`${this.globals.webapi}/apps/initiate`, {
        _id: this.selectedApp._id,
      })
      .subscribe(
        (res: any) => {
          if (res.acknowledged && res.modifiedCount == 1) {
            this.messenger.add({
              severity: 'success',
              summary: 'App Initiated!',
              detail: 'Good things are ahead :)',
            });
            this.selectedApp.initiated = true;
          } else {
            console.log('ERROR');
            this.messenger.add({
              severity: 'danger',
              summary: 'Failed to initiate app.',
              detail:
                'There must be something wrong on our end.  Please retry shortly.',
            });
            this.selectedApp.initiated = false;
          }
        },
        (error: HttpErrorResponse) => {
          console.log('ERROR');
          this.messenger.add({
            severity: 'danger',
            summary: 'Failed to initiate app.',
            detail:
              'There must be something wrong on our end.  Please retry shortly.',
          });
          this.selectedApp.initiated = false;
        }
      );
  }

  addApp() {
    this.showNewAppModal = true;
  }
}
