import { UserData } from './../login/child-classes/User';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DispatcherService {
  constructor() {}

  user$: BehaviorSubject<UserData> = new BehaviorSubject({});
  pfp$: BehaviorSubject<string> = new BehaviorSubject('');
}
