import { AuthService } from './../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { slide } from './child-classes/angular-animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slide],
})
export class LoginComponent {
  constructor(public toast: ToastController, public auth: AuthService) {}
}
