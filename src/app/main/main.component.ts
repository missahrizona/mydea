import { SwiperComponent } from 'swiper/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(public auth: AuthService) {}

  @ViewChild('ionTabs') ionTabs: IonTabs;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  tabsactive: boolean[] = [true, false, false];

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.ionTabs);
    console.log(this.swiper);
  }

  tabclicked(event: any, tabidx?: number) {
    console.log(event);
    this.tabsactive = this.tabsactive.map((e, i) => {
      return tabidx == i ? true : false;
    });
    this.swiper?.swiperRef.slideTo(tabidx || 0, 100);
  }

  tabsWillChange(event: any) {
    this.ionTabs.outlet;
    console.log(event);
  }
}
