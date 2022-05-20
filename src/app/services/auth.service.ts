import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GlobalsService } from './globals.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../login/child-classes/User';
import * as moment from 'moment';
import { Steps } from '../login/child-classes/LoginSteps';
import { Coder } from '../login/child-classes/Coder';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(
    private http: HttpClient,
    public globals: GlobalsService,
    public toast: ToastController,
    private router: Router
  ) {
    let usr = localStorage.getItem('user');
    if (usr != null) {
      let u = JSON.parse(usr) as User;
      this.setUser(u);
      if (this.user.authenticated) {
        this.router.navigate(['/home']);
      } else {
        this.loginstep = Steps.VERIFY_CODE;
      }
    } else {
      this.loginstep = Steps.INPUT_TEL;
    }
  }

  creatinginprogress: boolean = false;
  verifyingcode: boolean = false;
  code: string;
  loginstep: number = 0;
  msg: any = null;
  user: User = new User();

  codeprogress: Coder = new Coder();

  ngOnInit(): void {}

  setUser(u: User) {
    this.user = new User(u.tel, u.displayname, moment(u.validatedon));
    let then = moment().subtract(7, 'days'),
      now = moment();
    this.user.authenticated = this.user.validatedon?.isBetween(then, now);
    localStorage.setItem('user', JSON.stringify(this.user));
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

  async codechanged(event: any) {
    if (this.code.length == 6) {
      let progressbar = document.querySelector('.progress-bar') as HTMLElement;
      progressbar.style.opacity = '1';
      this.codeprogress.value = 0;
      this.codeprogress.interval = setInterval(
        (async () => {
          this.codeprogress.value += 0.1;
          if (this.codeprogress.value >= 1) {
            clearInterval(this.codeprogress.interval);
            if (this.msg.code == this.code) {
              this.codeprogress.color = 'success';
              if (this.user.displayname == '')
                this.loginstep = Steps.DISPLAY_NAME;
              else this.loginstep = Steps.GREETING;
            } else {
              this.codeprogress.color = 'danger';
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
          }
        }).bind(this),
        100
      );
    }
    // verify code matches
  }

  accountexists(): void {
    this.http
      .post(`${this.globals.webapi}/auth/exists`, {
        tel: this.user.tel,
      })
      .subscribe(async (res: any) => {
        if (res == null) {
          // account doesnt exist
          this.requestcode();
        } else {
          this.setUser(res);
          if (this.user.authenticated) {
            this.loginstep = Steps.GREETING;
          } else {
            this.requestcode();
          }
        }
      });
  }

  createaccount(): void {
    this.creatinginprogress = true;
    let usr = new User(this.user.tel, this.user.displayname, moment());
    this.http
      .post(`${this.globals.webapi}/auth/createaccount`, usr)
      .subscribe((res) => {
        this.setUser(usr);
        this.loginstep = Steps.GREETING;
        this.creatinginprogress = false;
      });
  }

  getstarted() {
    this.router.navigate(['home']);
  }
}
