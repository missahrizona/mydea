import { AppAssistant } from './../AppAssistant';
import { Component, OnInit, Input } from '@angular/core';

import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-app-detail-modal',
  templateUrl: './app-detail-modal.component.html',
  styleUrls: ['./app-detail-modal.component.scss'],
})
export class AppDetailModalComponent implements OnInit {
  constructor(public apps: AppAssistant) {}

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  ngOnInit(): void {}
}
