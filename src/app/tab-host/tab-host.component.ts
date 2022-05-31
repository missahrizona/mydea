import { GlobalsService } from 'src/app/services/globals.service';
import { NavData, NavigationService } from './../services/navigation.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

declare const RainyDay: any;

@Component({
  selector: 'app-tab-host',
  templateUrl: './tab-host.component.html',
  styleUrls: ['./tab-host.component.scss'],
})
export class TabHostComponent implements OnInit, AfterViewInit {
  constructor(
    public auth: AuthService,
    private nav: NavigationService,
    public globals: GlobalsService
  ) {}

  @ViewChild('ionTabs') ionTabs: IonTabs;

  tabsactive: boolean[] = [true, false, false];
  backgroundImage: string = 'url(../assets/images/backgrounds/bg-0.jpg';

  ngOnInit(): void {
    this.nav.tabDispatcher.subscribe((navdata: NavData) => {
      if (navdata != null) {
        this.setTabStates(navdata.index);
      }
    });

    this.globals.backgroundImage$.subscribe((val: string) => {
      if (!val) return;
      this.backgroundImage = val;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.querySelector('app-logo svg')?.classList.add('active');
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
