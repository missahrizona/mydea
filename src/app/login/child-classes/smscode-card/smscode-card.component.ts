import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uwu-smscode-card',
  templateUrl: './smscode-card.component.html',
  styleUrls: ['./smscode-card.component.scss'],
})
export class SmscodeCardComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  back(): void {
    this.auth.loginstep = 0;
    this.auth.msg = {};
    this.auth.code = '';
  }
}
