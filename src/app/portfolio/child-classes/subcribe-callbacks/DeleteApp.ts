import { AppAssistant } from './../AppAssistant';
import { App } from '../App';

export class DeleteApp {
  static success: (this: AppAssistant, app: App, res: any) => void = function (
    this,
    app,
    res
  ) {
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
}
