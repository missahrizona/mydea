import { AppAssistant } from './../AppAssistant';
import { BehaviorSubject } from 'rxjs';

export class DeleteFeature {
  constructor() {}

  static success: (
    this: AppAssistant,
    idx: number,
    listener: BehaviorSubject<boolean>,
    res: any
  ) => void = function (this, idx, listener, res) {
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
}
