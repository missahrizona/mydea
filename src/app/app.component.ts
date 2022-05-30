import { GlobalsService } from './services/globals.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public globals: GlobalsService, private auth: AuthService) {
    this.globals.backgroundImage$.subscribe((val: string) => {
      this.backgroundImage = val;
    });
  }

  ngOnInit(): void {
    this.auth.initUser();
  }

  isDarkMode: boolean = false;

  _reload: boolean = false;

  backgroundImage: string = 'url(../assets/images/bg-1.jpg';

  reload() {
    setTimeout(() => (this._reload = false), 10);
    setTimeout(() => (this._reload = true), 20);
  }
}
