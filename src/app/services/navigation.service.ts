import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  slideDispatcher: BehaviorSubject<any> = new BehaviorSubject(null);

  tabDispatcher: BehaviorSubject<any> = new BehaviorSubject(null);

  slideTo(navdata: NavData) {
    this.slideDispatcher.next(navdata);
  }

  tabTo(navdata: NavData) {
    this.tabDispatcher.next(navdata);
  }
}

export class NavData {
  constructor(i: number, ms?: number) {
    this.index = i;
    this.ms = ms || 100;
  }
  index: number = 0;
  ms: number = 100;
}
