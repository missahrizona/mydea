import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GlobalsService } from './globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../login/child-classes/User';
import * as moment from 'moment';
import { Steps } from '../login/child-classes/LoginSteps';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(
    private http: HttpClient,
    public globals: GlobalsService,
    public toast: ToastController,
    private router: Router
  ) {}

  userIsAuthenticated: boolean = false;
  creatinginprogress: boolean = false;
  verifyingcode: boolean = false;
  code: string;
  loginstep: number = 0;
  msg: any = null;
  user: User = new User();

  ngOnInit(): void {
    let usr = localStorage.getItem('user');
    if (usr != null) {
      this.user = JSON.parse(usr) as User;
      let now = moment();
      let then = moment().subtract(7, 'days');
      if (this.user.validatedon?.isBetween(then, now)) {
        this.loginstep = Steps.GREETING;
      } else {
        this.loginstep = Steps.VERIFY_CODE;
      }
    } else {
      this.loginstep = Steps.INPUT_TEL;
    }
  }

  getuser(): void {}

  createaccount(): void {
    this.creatinginprogress = true;
    let usr = new User(this.user.tel, this.user.displayname, moment());
    this.http
      .post(`${this.globals.webapi}/auth/createaccount`, usr)
      .subscribe((res) => {
        this.user = usr;
        this.loginstep = Steps.GREETING;
        this.creatinginprogress = false;
      });
  }

  accountexists(): void {
    this.http
      .post(`${this.globals.webapi}/auth/exists`, {
        tel: this.user.tel,
      })
      .subscribe(async (res: any) => {
        if (res == null) {
          // account doesnt exist
          this.loginstep = Steps.DISPLAY_NAME;
        } else {
          this.user = res;
          this.user.validatedon = moment();
          this.loginstep = Steps.GREETING;
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      });
  }

  async codechanged(event: any) {
    if (this.msg.code == this.code) {
      this.accountexists();
    } else {
      await this.toast.create({
        message: `Incorrect code, pls enter the code sent to ${this.user.tel}`,
        duration: 2000,
        position: 'bottom',
        translucent: true,
        animated: true,
        icon: 'alert-outline',
        color: 'warning',
      });
    }

    // verify code matches
  }

  requestcode(): void {
    this.loginstep = Steps.VERIFY_CODE;
    this.http
      .post(`${this.globals.webapi}/auth/requestcode`, {
        tel: this.user.tel,
      })
      .subscribe((res) => {
        this.msg = res;
      });
    // request code
  }

  getstarted() {
    this.router.navigate(['home']);
  }
}
