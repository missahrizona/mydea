import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xoxo-greeting-card',
  templateUrl: './greeting-card.component.html',
  styleUrls: ['./greeting-card.component.scss'],
})
export class GreetingCardComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
