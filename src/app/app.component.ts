import { GlobalsService } from './services/globals.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public globals: GlobalsService) {
    this.globals.backgroundImage$.subscribe((val: string) => {
      this.backgroundImage = val;
    });
  }

  isDarkMode: boolean = false;

  _reload: boolean = false;

  backgroundImage: string = 'url(../assets/images/bg-1.jpg';

  reload() {
    setTimeout(() => (this._reload = false), 10);
    setTimeout(() => (this._reload = true), 20);
  }
}
