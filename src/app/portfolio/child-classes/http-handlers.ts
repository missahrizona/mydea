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
    collaborator: string
  ) {
    return function (this: any, res: any) {
      if (res.insertedId && res.insertedId.length) {
        this.messenger.add({
          severity: 'success',
          summary: `Congrats ${collaborator}!`,
          detail: `This is the beginning of ${appname} :)`,
        });
        this.refresh();
        this.slide1.nativeElement.style.transform = 'translateX(0)';
        this.slide2.nativeElement.style.transform = 'translateX(100%)';
        this.slide3.nativeElement.style.transform = 'translateX(100%)';
        this.views.newapp = false;
      } else {
        this.messenger.add({
          severity: 'error',
          summary: 'Hmmm, something went wrong.',
          detail: "We'll assume this is our fault",
        });
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
        this.setApps(res.apps);
      } else {
        this.messenger.add({
          severity: 'error',
          summary: 'Hmmm, something went wrong.',
          detail: "We'll assume this is our fault",
        });
      }
    };
  };
}

export class RefreshApps {
  static success: Function = function (this: any, res: any) {
    return function (this: any, res: any) {
      this.set(res);
    };
  };
}
