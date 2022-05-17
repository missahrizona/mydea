import { AuthService } from './../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public toast: ToastController, public auth: AuthService) {}

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
