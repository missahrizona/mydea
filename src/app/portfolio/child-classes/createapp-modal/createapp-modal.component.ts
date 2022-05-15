import { AppAssistant } from './../AppAssistant';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { App } from '../App';
import { IonTitle } from '@ionic/angular';

@Component({
  selector: 'app-createapp-modal',
  templateUrl: './createapp-modal.component.html',
  styleUrls: ['./createapp-modal.component.scss'],
})
export class CreateappModalComponent implements OnInit {
  constructor(public apps: AppAssistant) {}

  slides: string[] = ['App Name', 'Timeline', 'All done'];
  animate: boolean = false;

  @ViewChild('swiper', { static: false }) swiper: SwiperComponent;
  @ViewChild('title', { read: ElementRef }) title: ElementRef;

  bgImage: string = '';

  ngOnInit(): void {
    this.bgImage = `url(../../../../assets/images/bg-${Math.floor(
      Math.random() * 35
    )}.jpg)`;

    setInterval(() => {
      let idx = Math.floor(Math.random() * 35);
      this.bgImage = `url(../../../../assets/images/bg-${idx}.jpg)`;
    }, 5000);
  }

  slideNext() {
    this.swiper.swiperRef.slideNext(400);
  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev(400);
  }

  close() {
    this.apps.stagingApp = new App();
    this.apps.views.newapp = false;
    this.animate = false;
  }

  slideChanged(event: any) {
    if (event[0].activeIndex == 1) {
      this.animate = true;
    }
    this.title.nativeElement.innerHTML = this.slides[event[0].activeIndex];
  }
}
