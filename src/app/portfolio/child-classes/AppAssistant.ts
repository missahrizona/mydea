import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { GlobalsService } from 'src/app/services/globals.service';
import {
  CreateApp,
  DeleteApp,
  DeleteFeature,
  InitiateStartup,
  NewFeature,
  RefreshApps,
} from './http-handlers';
import { App } from './App';

@Injectable({ providedIn: 'any' })
export class AppAssistant {
  constructor(
    private http: HttpClient,
    private globals: GlobalsService,
    private toast: ToastController
  ) {}

  collaborators: string[] = [];
  isSidebarOpen: boolean = false;
  isNewFeatureOpen: boolean = false;
  selectedApp: App = new App();
  newFeatureText: string = '';
  editingFeatures: boolean = false;
  addingFeatures: boolean = false;
  apps: App[] = [];
  groupedApps: any = {};
  showNewAppModal: boolean = false;
  newappName: string = '';
  newappDesc: string = '';
  newappFeature: string = '';
  newappFeatures: string[] = [];
  loading: boolean = true;
  deleting: boolean = false;
  fabOpen: boolean = false;
  isModalOpen: boolean = false;
  isAppDetailOpen: boolean = false;
  appDeleteCandidate: App = new App();

  async refresh() {
    this.loading = true;
    this.http
      .get(`${this.globals.webapi}/apps`)
      .subscribe(RefreshApps.success().bind(this));
  }

  add() {
    this.showNewAppModal = true;
  }

  set(apps: App[]) {
    this.groupedApps = _.groupBy(apps, 'originator');
    this.collaborators = Object.keys(this.groupedApps);
    this.loading = false;
  }

  confirmDelete(event: any, app: App): void {
    this.appDeleteCandidate = app;
    this.isModalOpen = true;
    event.stopPropagation();
  }

  isDeleting(event: any) {
    event.stopPropagation();
    this.deleting = !this.deleting;
  }

  delete() {
    this.appDeleteCandidate.deleting = true;
    this.http
      .delete(`${this.globals.webapi}/apps/delete`, {
        body: this.appDeleteCandidate,
      })
      .subscribe(DeleteApp.success({ ...this.appDeleteCandidate }).bind(this));
    this.isModalOpen = false;
  }

  cancelDelete() {
    this.isModalOpen = false;
    this.appDeleteCandidate = new App();
  }

  selected(app: any): void {
    this.isAppDetailOpen = true;
    this.selectedApp = app;
  }

  create(evt: any) {
    let app = new App(this.newappName, 'Lily', this.newappFeatures);

    this.http
      .post(`${this.globals.webapi}/apps/add`, app)
      .subscribe(CreateApp.success(this.newappName, 'Lily').bind(this));

    this.newappName = '';
    this.newappFeature = '';
    this.newappFeatures = [];
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

  async newFeatureSaved() {
    // check:  empty input
    if (this.newFeatureText == '') {
      return;
    }
    // check:  duplicates
    else if (this.selectedApp.features.indexOf(this.newFeatureText) != -1) {
      let toastr = await this.toast.create({
        message: "This already exists.  Don't give up! :)",
        duration: 2000,
      });
      toastr.present();
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
}
