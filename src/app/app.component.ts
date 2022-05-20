import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  isDarkMode: boolean = false;

  _reload: boolean = false;

  ngOnInit() {}
  reload() {
    setTimeout(() => (this._reload = false), 10);
    setTimeout(() => (this._reload = true), 20);
  }
}
