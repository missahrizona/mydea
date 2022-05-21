import { NavData, NavigationService } from './../services/navigation.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { NodeStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-tab-host',
  templateUrl: './tab-host.component.html',
  styleUrls: ['./tab-host.component.scss'],
})
export class TabHostComponent implements OnInit {
  constructor(public auth: AuthService, private nav: NavigationService) {}

  @ViewChild('ionTabs') ionTabs: IonTabs;

  tabsactive: boolean[] = [true, false, false];

  ngOnInit(): void {
    this.nav.tabDispatcher.subscribe((navdata: NavData) => {
      if (navdata != null) {
        this.setTabStates(navdata.index);
      }
    });
  }

  tabclicked(event: any, tabidx: number) {
    this.setTabStates(tabidx);
    this.nav.slideTo(new NavData(tabidx, 100));
  }

  setTabStates(tabidx: number) {
    let nodes = document.getElementsByTagName('ion-tab-button');
    for (let i = 0; i < nodes.length; i++) {
      if (i == tabidx) nodes[i].classList.add('tab-selected');
      else nodes[i].classList.remove('tab-selected');
    }
    this.tabsactive = this.tabsactive.map((e, i) => {
      return tabidx == i ? true : false;
    });
  }
}
