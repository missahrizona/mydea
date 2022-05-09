import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { App } from '../classes/App';

export class DeleteFeature {
  constructor() {}

  static success: Function = function (
    this: any,
    feature: string,
    idx: number
  ) {
    return function (this: any, res: any) {
      if (res.acknowledged && res.modifiedCount == 1) {
        this.messenger.add({
          severity: 'success',
          summary: 'Deleted feature: ' + feature,
          detail: 'Not feeling it?',
        });
        this.selectedApp.features.splice(idx, 1);
        this.selectedApp.features = [...this.selectedApp.features];
      }
    };
  };
}

export class NewFeature {
  static success: Function = function (this: any) {
    return function (this: any, res: any) {
      if (res.acknowledged && res.modifiedCount == 1) {
        this.messenger.add({
          severity: 'success',
          summary: 'New feature added!',
          detail: 'Keep it up :)',
        });
        this.selectedApp.features = this.selectedApp.features.concat(
          this.newFeatureText
        );
        this.isNewFeatureOpen = false;
        this.newFeatureText = '';
      }
    };
  };
}

export class InitiateStartup {
  static success: Function = function (this: any) {
    return function (this: any, res: any) {
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
      this.selectedApp.initiated = false;
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
      if (res.acknowledged && res.insertedId && res.insertedId.length) {
        this.messenger.add({
          severity: 'success',
          summary: `Congrats ${collaborator}!`,
          detail: `This is the beginning of ${appname} :)`,
        });
        this.refresh();
        this.slide1.nativeElement.style.transform = 'translateX(0)';
        this.slide2.nativeElement.style.transform = 'translateX(100%)';
        this.slide3.nativeElement.style.transform = 'translateX(100%)';
        this.showNewAppModal = false;
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
    return async function (this: any, res: any) {
      this.appDeleteCandidate = new App();
      if (res.deletedCount == 1) {
        (
          await this.toast.create({
            message: `${app.name} Deleted.`,
            duration: 2000,
          })
        ).present();
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
      console.log(res);
      console.log(this);
      this.set(res);
    };
  };
}
