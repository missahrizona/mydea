import { HttpErrorResponse } from '@angular/common/http';
import { AppAssistant } from './../AppAssistant';
export class InitiateStartup {
  static success: (this: AppAssistant, res: any) => void = function (
    this,
    res
  ) {
    if (res.modifiedCount == 1) {
      this.selected.initiated = true;
    } else {
      this.selected.initiated = false;
    }
  };

  static error: (this: AppAssistant, error: HttpErrorResponse) => void =
    function (this, error) {
      this.selected.initiated = false;
    };
}
