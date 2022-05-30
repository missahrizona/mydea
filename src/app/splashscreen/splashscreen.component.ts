import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss'],
})
export class SplashscreenComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    let el = document.querySelector('app-logo svg');
    setTimeout(() => {
      el?.classList.toggle('active');
    }, 50);
    setInterval(() => {
      el?.classList.toggle('active');
    }, 2200);
  }
}
