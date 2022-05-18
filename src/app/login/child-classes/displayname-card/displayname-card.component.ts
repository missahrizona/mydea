import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uwu-displayname-card',
  templateUrl: './displayname-card.component.html',
  styleUrls: ['./displayname-card.component.scss'],
})
export class DisplaynameCardComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  back(): void {
    this.auth.loginstep = 1;
  }
}
