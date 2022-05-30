import { LibService } from './../../services/lib.service';
import { ApiService } from './../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ElementRef, Injectable } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import {
  CreateApp,
  DeleteApp,
  NewFeature,
  DeleteFeature,
  InitiateStartup,
  RefreshApps,
} from './subcribe-callbacks';
import { App } from './App';
import { ViewStatus, FeatureStatus } from './AppStatus';

@Injectable({ providedIn: 'any' })
export class AppAssistant {
  constructor(
    private api: ApiService,
    public lib: LibService,
    private globals: GlobalsService,
    public toast: ToastController
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
  creating: boolean = false;

  views: ViewStatus = new ViewStatus();
  features: FeatureStatus = new FeatureStatus();

  refresher: ElementRef;

  async refresh(refresher: boolean = false) {
    this.loading = true;
    this.api.get('apps').subscribe(RefreshApps.success.bind(this, refresher));
  }

  add() {
    this.views.newapp = true;
  }

  setRefresherViewChild(refresher: ElementRef) {
    this.refresher = refresher;
  }

  set(apps: App[]) {
    this.groupedApps = this.lib._.groupBy(
      this.lib._.forEach(
        apps,
        (e: App) => (e.originator = !e.originator ? 'Lily' : e.originator)
      ),
      'originator'
    );
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
    this.api
      .delete('apps/delete', {
        body: this.selectedForDelete,
      })
      .subscribe(DeleteApp.success.bind(this, { ...this.selectedForDelete }));
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

  create() {
    this.creating = true;
    this.stagingApp.originator = 'Lily';
    this.api
      .post('apps/add', { ...this.stagingApp })
      .subscribe(
        CreateApp.success.bind(
          this,
          this.stagingApp.name,
          this.stagingApp.originator
        )
      );

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
      this.api
        .post('features/delete', body)
        .subscribe(DeleteFeature.success.bind(this, idx, listener));
    }
  }

  newFeatureSaved(listener: BehaviorSubject<boolean>) {
    // check:  empty input
    if (this.stagingFeature == '') {
      listener.next(true);
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
    } else {
      this.api
        .post('features/save', {
          _id: this.selected._id,
          feature: this.stagingFeature,
        })
        .subscribe(NewFeature.success.bind(this, listener));
    }
  }

  initiateStartupClicked(): void {
    this.api
      .post('apps/initiate', {
        _id: this.selected._id,
      })
      .subscribe(
        InitiateStartup.success.bind(this),
        InitiateStartup.error.bind(this)
      );
  }

  setInProgress(event: any, idx: number) {
    this.api
      .post('timeline/inprogress', {
        app: this.selected,
        eventindex: idx,
        event: event,
      })
      .subscribe((res: any) => {
        if ((res.modifiedCount = 1)) {
          event.inProgress = true;
        }
      });
  }
  setIsDone(event: any, idx: number) {
    this.api
      .post('timeline/isdone', {
        app: this.selected,
        eventindex: idx,
        event: event,
      })
      .subscribe((res: any) => {
        if ((res.modifiedCount = 1)) {
          event.inProgress = false;
          event.isDone = true;
        }
      });
  }
}
