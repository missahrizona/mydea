import { Moment } from 'moment';

export class User {
  constructor(tel?: string, displayname?: string, validatedon?: Moment) {
    this.tel = tel || '';
    this.displayname = displayname || '';
    this.validatedon = validatedon;
  }
  public displayname: string = '';
  public tel: string = '';
  public _id: string = '';
  public validatedon: Moment | undefined;
}
