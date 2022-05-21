import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { App } from './App';

export class DeleteFeature {
  constructor() {}

  static success: Function = function (
    this: any,
    feature: string,
    idx: number,
    listener: BehaviorSubject<boolean>
  ) {
    return function (this: any, res: any) {
      if (res.modifiedCount == 1) {
        (async () => {
          let toastr = await this.toast.create({
            message: "Feature deleted. Wasn't feeling it?",
            duration: 2000,
          });
          toastr.present();
        })();

        this.selected.features.splice(idx, 1);
        this.selected.features = [...this.selected.features];
      }
      listener.next(true);
    };
  };
}

export class NewFeature {
  static success: Function = function (
    this: any,
    listener: BehaviorSubject<boolean>
  ) {
    return function (this: any, res: any) {
      if (res.modifiedCount == 1) {
        (async () => {
          let toastr = await this.toast.create({
            message: 'Feature added.  Keep it up :)',
            duration: 2000,
          });
          toastr.present();
        })();
        this.selected.features = this.selected.features.concat(
          this.stagingFeature
        );
        this.stagingFeature = '';
      }
      listener.next(true);
    };
  };
}

export class InitiateStartup {
  static success: Function = function (this: any) {
    return function (this: any, res: any) {
      if (res.modifiedCount == 1) {
        this.messenger.add({
          severity: 'success',
          summary: 'App Initiated!',
          detail: 'Good things are ahead :)',
        });
        this.selected.initiated = true;
      } else {
        console.log('ERROR');
        this.messenger.add({
          severity: 'danger',
          summary: 'Failed to initiate app.',
          detail:
            'There must be something wrong on our end.  Please retry shortly.',
        });
        this.selected.initiated = false;
      }
    };
  };

  static error: Function = function (this: any) {
    return function (this: any, error: HttpErrorResponse) {
      this.messenger.add({
        severity: 'danger',
        summary: 'Failed to initiate app.',
        detail:
          'There must be something wrong on our end.  Please retry shortly.',
      });
      this.selected.initiated = false;
    };
  };
}

export class CreateApp {
  static success: Function = function (
    this: any,
    appname: string,
    originator: string
  ) {
    return function (this: any, res: any) {
      this.stagingApp = new App();

      if (res.insertedId && res.insertedId.length) {
        (async () => {
          let toastr = await this.toast.create({
            message: `Congratz ${originator}, this is the beginning of ${appname}!`,
            duration: 2000,
          });
          toastr.present();
        })();
        this.refresh();
        this.views.newapp = false;
      } else {
        (async () => {
          let toastr = await this.toast.create({
            message: "Something went wrong. We'll take theblame",
            duration: 2000,
          });
          toastr.present();
        })();
      }
    };
  };
}

export class DeleteApp {
  static success: Function = function (this: any, app: App) {
    return function (this: any, res: any) {
      this.stagingApp = new App();
      if (res.deletedCount == 1) {
        (async () => {
          let toastr = await this.toast.create({
            message: `${app.name} Deleted.`,
            duration: 2000,
          });
          toastr.present();
        })();
        this.set(res.apps);
      } else {
        (async () => {
          let toastr = await this.toast.create({
            message: "Something went wrong. We'll take the blame",
            duration: 2000,
          });
          toastr.present();
        })();
      }
    };
  };
}

export class RefreshApps {
  static success: Function = function (this: any, refresher: boolean) {
    return function (this: any, res: any) {
      if (refresher) {
        this.refresher.nativeElement.complete();
      }
      this.set(res);
    };
  };
}
