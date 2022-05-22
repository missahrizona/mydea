import { BehaviorSubject } from 'rxjs';

export class NewFeature {
  static success: (
    this: any,
    listener: BehaviorSubject<boolean>,
    res: any
  ) => void = function (this, listener, res) {
    if (res.modifiedCount == 1) {
      (async () => {
        let toastr = await this.toast.create({
          message: 'Feature added.  Keep it up :)',
          duration: 2000,
        });
        toastr.present();
      })();
      this.selected.features = [this.stagingFeature].concat(
        this.selected.features
      );
      this.stagingFeature = '';
    }
    listener.next(true);
  };
}
