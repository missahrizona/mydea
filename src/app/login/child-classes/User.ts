import { Moment } from 'moment';
import * as moment from 'moment';
export class User {
  constructor(u: UserData) {
    this._id = u._id;
    this.tel = u.tel || '';
    this.displayname = u.displayname || '';
    this.validatedon = moment(u.validatedon);
    this.settings = u.settings || {};
  }
  public _id: string | undefined = '';
  public displayname: string = '';
  public tel: string = '';
  public validatedon: Moment | undefined;
  public authenticated: boolean | undefined;
  public settings: any;
}

export interface UserData {
  _id?: string;
  tel?: string;
  displayname?: string;
  validatedon?: Moment;
  settings?: any;
}
