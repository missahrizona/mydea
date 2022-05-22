import { App } from '../App';
import { AppAssistant } from './../AppAssistant';
export class CreateApp {
  static success: (
    this: AppAssistant,
    appname: string,
    originator: string,
    res: any
  ) => void = function (this, appname, originator, res) {
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
}
