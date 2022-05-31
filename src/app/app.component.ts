import { Router } from '@angular/router';
import { GlobalsService } from './services/globals.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
  EffectCoverflow,
} from 'swiper';

SwiperCore.use([
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
  EffectCoverflow,
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public globals: GlobalsService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.navigate(['splash']);
    this.auth.initUser();
    console.log('APP COMPONENT');
  }

  _reload: boolean = false;

  reload() {
    setTimeout(() => (this._reload = false), 10);
    setTimeout(() => (this._reload = true), 20);
  }
}
