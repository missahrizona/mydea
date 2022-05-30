import { DispatcherService } from './dispatcher.service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { LibService } from './lib.service';
import { ToastController } from '@ionic/angular';
import { GlobalsService } from './globals.service';
import { Injectable, OnInit } from '@angular/core';
import { User, UserData } from '../login/child-classes/User';
import { Steps } from '../login/child-classes/LoginSteps';
import { Coder } from '../login/child-classes/Coder';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public globals: GlobalsService,
    public toast: ToastController,
    public lib: LibService,
    private router: Router,
    private api: ApiService,
    private d: DispatcherService
  ) {}

  creatinginprogress: boolean = false;
  verifyingcode: boolean = false;
  code: string;
  loginstep: number = 0;
  msg: any = null;
  user: User = new User({});

  codeprogress: Coder = new Coder();

  initUser() {
    let usr = localStorage.getItem('user');
    if (usr != null) {
      let u = JSON.parse(usr) as User;
      this.api.post('auth/user', u).subscribe((userdata: UserData) => {
        this.setUser(userdata);
        if (this.user.authenticated) {
          let bgurl = `url(../assets/images/backgrounds/bg-${this.user.settings.bgindex}.jpg)`;
          this.globals.backgroundImage$.next(bgurl);
          this.router.navigate(['/home']);
        } else {
          this.loginstep = Steps.VERIFY_CODE;
        }
      });
    } else {
      this.loginstep = Steps.INPUT_TEL;
    }
  }

  setUser(u: UserData) {
    this.user = new User(u);
    let then = this.lib.moment().subtract(7, 'days'),
      now = this.lib.moment();
    this.user.authenticated = this.user.validatedon?.isBetween(then, now);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.d.user$.next(this.user);
  }

  fetchUser(u: User): Observable<any> {
    return this.api.post('auth/user', u);
  }

  requestcode(): void {
    this.loginstep = Steps.VERIFY_CODE;
    this.api
      .post('auth/requestcode', {
        tel: this.user.tel,
      })
      .subscribe((res: any) => {
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
    this.api
      .post('auth/exists', {
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
    let usr: User = new User({
      tel: this.user.tel,
      displayname: this.user.displayname,
      validatedon: this.lib.moment(),
    });
    this.api.post('auth/createaccount', usr).subscribe((res) => {
      if (res.acknowledged == true) {
        usr._id = res.insertedId;
        this.setUser(usr);
        this.loginstep = Steps.GREETING;
        this.creatinginprogress = false;
      }
    });
  }

  getstarted() {
    this.router.navigate(['home']);
  }
}
