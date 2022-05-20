import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class LibService {
  constructor() {
    this.moment = moment;
    this._ = _;
  }

  moment;
  _: any;
}
