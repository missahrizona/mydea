import { AuthService } from './../../../services/auth.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'uwu-smscode-card',
  templateUrl: './smscode-card.component.html',
  styleUrls: ['./smscode-card.component.scss'],
})
export class SmscodeCardComponent {
  constructor(public auth: AuthService) {}

  @ViewChild('smscodeinput') smsscodeinput: IonInput;

  back(): void {
    this.auth.loginstep = 0;
    this.auth.msg = {};
    this.auth.codes = ['', '', '', '', '', ''];
  }
}
