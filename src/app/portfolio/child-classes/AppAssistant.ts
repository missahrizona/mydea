import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
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
import { ViewStatus, FeatureStatus } from './AppStatus';

@Injectable({ providedIn: 'any' })
export class AppAssistant {
  constructor(
    private http: HttpClient,
    private globals: GlobalsService,
    private toast: ToastController
  ) {}

  apps: App[] = [];
  groupedApps: any = {};

  selected: App = new App();
  selectedForDelete: App = new App();

  collaborators: string[] = [];

  stagingFeature: string = '';
  stagingApp: App = new App();

  loading: boolean = true;
  deleting: boolean = false;

  views: ViewStatus = new ViewStatus();
  features: FeatureStatus = new FeatureStatus();

  async refresh() {
    this.loading = true;
    this.http
      .get(`${this.globals.webapi}/apps`)
      .subscribe(RefreshApps.success().bind(this));
  }

  add() {
    this.views.newapp = true;
  }

  set(apps: App[]) {
    this.groupedApps = _.groupBy(apps, 'originator');
    this.collaborators = Object.keys(this.groupedApps);
    this.loading = false;
  }

  confirmDelete(event: any, app: App): void {
    this.selectedForDelete = app;
    this.views.deleteapp = true;
    event.stopPropagation();
  }

  isDeleting(event: any) {
    event.stopPropagation();
    this.deleting = !this.deleting;
  }

  delete() {
    this.selectedForDelete.deleting = true;
    this.http
      .delete(`${this.globals.webapi}/apps/delete`, {
        body: this.selectedForDelete,
      })
      .subscribe(DeleteApp.success({ ...this.selectedForDelete }).bind(this));
    this.views.deleteapp = false;
  }

  cancelDelete() {
    this.views.deleteapp = false;
    this.selectedForDelete = new App();
  }

  appSelected(app: any): void {
    this.views.appdetail = true;
    this.selected = app;
  }

  create(evt: any) {
    this.http
      .post(`${this.globals.webapi}/apps/add`, this.stagingApp)
      .subscribe(CreateApp.success(this.stagingApp.name, 'Lily').bind(this));

    this.stagingApp = new App();
  }

  deleteFeatureClicked(
    feature: string,
    listener: BehaviorSubject<boolean>
  ): void {
    let idx = this.selected.features.findIndex((e) => e == feature);
    let body = {
      _id: this.selected._id,
      feature: feature,
    };
    if (idx != -1) {
      this.http
        .post(`${this.globals.webapi}/features/delete`, body)
        .subscribe(DeleteFeature.success(feature, idx, listener).bind(this));
    }
  }

  newFeatureSaved(listener: BehaviorSubject<boolean>) {
    // check:  empty input
    if (this.stagingFeature == '') {
      return;
    }
    // check:  duplicates
    else if (this.selected.features.indexOf(this.stagingFeature) != -1) {
      listener.next(true);
      (async () => {
        let toastr = await this.toast.create({
          message: "This already exists.  Don't give up! :)",
          duration: 2000,
        });
        toastr.present();
      })();
      return;
    }
    this.http
      .post(`${this.globals.webapi}/features/save`, {
        _id: this.selected._id,
        feature: this.stagingFeature,
      })
      .subscribe(NewFeature.success(listener).bind(this));
  }

  initiateStartupClicked(): void {
    this.http
      .post(`${this.globals.webapi}/apps/initiate`, {
        _id: this.selected._id,
      })
      .subscribe(
        InitiateStartup.success.bind(this),
        InitiateStartup.error.bind(this)
      );
  }

  setInProgress(event: any, idx: number) {}
  setIsDone(event: any, idx: number) {}
}
