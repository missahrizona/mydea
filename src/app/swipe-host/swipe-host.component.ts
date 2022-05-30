import { GlobalsService } from './../services/globals.service';
import { NavigationService, NavData } from './../services/navigation.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-swipe-host',
  templateUrl: './swipe-host.component.html',
  styleUrls: ['./swipe-host.component.scss'],
})
export class SwipeHostComponent implements OnInit {
  constructor(private nav: NavigationService, private globals: GlobalsService) {
    this.globals.backgroundImage$.subscribe((val: string) => {
      this.backgroundImage = val;
    });
  }

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  backgroundImage: string = 'url(../assets/images/backgrounds/bg-0.jpg';

  ngOnInit(): void {
    this.nav.slideDispatcher.subscribe((navdata: NavData) => {
      if (navdata != null) {
        this.swiper?.swiperRef.slideTo(navdata.index, navdata.ms);
      }
    });
  }

  slideChanged(event: any) {
    this.nav.tabTo(new NavData(event[0].activeIndex));
  }
}
