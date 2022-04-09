import { GlobalsService } from './../services/globals.service';
import { HttpClient } from '@angular/common/http';
import { MessageService, PrimeIcons } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { StartupApp } from './classes';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  animations: [],
})
export class PortfolioComponent implements OnInit {
  constructor(private messenger: MessageService, private http: HttpClient, public globals: GlobalsService) {}

  founders: string[] = ['Mark', 'Maria', 'Marcus', 'Robert'];
  isSidebarOpen: boolean = false;
  isNewFeatureOpen: boolean = false;
  selectedApp: StartupApp = new StartupApp();
  newFeatureText: string = '';
  isEditingFeatures: boolean = false;
  apps: StartupApp[] = [];
  groupedApps: any = {};

  ngOnInit(): void {
    // get all apps from monogdb
    this.http.get(`${this.globals.webapi}/apps`).subscribe((data) => {
      this.groupedApps = _.groupBy(data, 'founder');
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
    // check:  features property doesnt exist
    else if (this.selectedApp.features == undefined) {
      this.selectedApp.features = [this.newFeatureText];
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
      this.selectedApp.features = this.selectedApp.features.concat(
        this.newFeatureText
      );
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

  initiateStartupClicked(): void {}
}
