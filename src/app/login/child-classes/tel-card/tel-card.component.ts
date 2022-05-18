import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'uwu-tel-card',
  templateUrl: './tel-card.component.html',
  styleUrls: ['./tel-card.component.scss'],
})
export class TelCardComponent implements OnInit {
  constructor(public auth: AuthService) {}

  telformats: string[] = [
    'XXX-XXX-XXXX',
    '04XX XXX XXX',
    '0X XX XX XX XX',
    '1XX XXXX XXXX',
  ];
  telformaxidx: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.telformaxidx = Math.floor(Math.random() * 4);
    }, 3500);
  }
}
